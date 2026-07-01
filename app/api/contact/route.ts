import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  locale?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  people?: unknown;
  message?: unknown;
  company?: unknown;
};

const FIELD_LIMIT = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RATE_LIMIT_PER_DAY = 10;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function clean(value: unknown) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, FIELD_LIMIT);
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function parsePort(value: string) {
  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a positive integer");
  }
  return port;
}

function parseRateLimit() {
  const configuredLimit = Number(process.env.CONTACT_RATE_LIMIT_PER_DAY);
  if (Number.isInteger(configuredLimit) && configuredLimit > 0) {
    return configuredLimit;
  }
  return DEFAULT_RATE_LIMIT_PER_DAY;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const candidate = forwardedFor?.split(",")[0]?.trim() || realIp?.trim();
  return candidate || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const limit = parseRateLimit();
  const existing = rateLimitStore.get(ip);

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return { allowed: true, limit, remaining: limit - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: existing.resetAt
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    limit,
    remaining: limit - existing.count,
    resetAt: existing.resetAt
  };
}

function formatEmailBody({
  locale,
  name,
  email,
  phone,
  date,
  people,
  message
}: {
  locale: "es" | "en";
  name: string;
  email: string;
  phone: string;
  date: string;
  people: string;
  message: string;
}) {
  const labels =
    locale === "es"
      ? {
          name: "Nombre",
          email: "Email",
          phone: "WhatsApp / telefono",
          date: "Fecha deseada",
          people: "Numero de personas",
          message: "Mensaje",
          locale: "Idioma"
        }
      : {
          name: "Name",
          email: "Email",
          phone: "WhatsApp / Phone",
          date: "Preferred date",
          people: "Number of people",
          message: "Message",
          locale: "Language"
        };

  return [
    `${labels.name}: ${name}`,
    `${labels.email}: ${email}`,
    `${labels.phone}: ${phone || "-"}`,
    `${labels.date}: ${date || "-"}`,
    `${labels.people}: ${people || "-"}`,
    `${labels.message}: ${message || "-"}`,
    `${labels.locale}: ${locale}`
  ].join("\n");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (clean(payload.company)) {
    return NextResponse.json({ ok: true });
  }

  const locale = payload.locale === "es" ? "es" : "en";
  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const date = clean(payload.date);
  const people = clean(payload.people);
  const message = clean(payload.message);

  if (!name || !email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Name and valid email are required" },
      { status: 400 }
    );
  }

  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many contact requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
          ),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": "0"
        }
      }
    );
  }

  const subject =
    locale === "es"
      ? "Consulta sobre Arenal Forest Night Hike"
      : "Question about Arenal Forest Night Hike";

  try {
    const smtpHost = requiredEnv("SMTP_HOST");
    const smtpPort = parsePort(requiredEnv("SMTP_PORT"));
    const smtpSecure = requiredEnv("SMTP_SECURE").toLowerCase() === "true";
    const smtpUser = requiredEnv("SMTP_USER");
    const smtpPass = requiredEnv("SMTP_PASS");
    const contactTo = requiredEnv("CONTACT_TO");
    const contactFrom = requiredEnv("CONTACT_FROM");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      disableFileAccess: true,
      disableUrlAccess: true,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: `"Arenal Forest Night Hike" <${contactFrom}>`,
      to: contactTo,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: formatEmailBody({
        locale,
        name,
        email,
        phone,
        date,
        people,
        message
      })
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed", error);
    return NextResponse.json(
      { ok: false, error: "Email could not be sent" },
      { status: 500 }
    );
  }
}
