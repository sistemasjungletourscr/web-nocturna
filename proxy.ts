import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PAGE_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store"
};

const CANONICAL_HOST = "www.arenalnighthike.com";
const APEX_HOST = "arenalnighthike.com";

function withPageCacheHeaders(response: NextResponse) {
  Object.entries(PAGE_CACHE_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

function permanentRedirect(url: URL) {
  return withPageCacheHeaders(NextResponse.redirect(url, 308));
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    if (url.pathname === "/") url.pathname = "/en";
    return permanentRedirect(url);
  }

  if (request.nextUrl.pathname === "/") {
    return permanentRedirect(new URL("/en", request.url));
  }

  return withPageCacheHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/",
    "/robots.txt",
    "/sitemap.xml",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"
  ]
};
