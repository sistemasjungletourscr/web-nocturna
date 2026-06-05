# Project Context For Agents

## Site Overview

This repo is the website for **Arenal Forest Night Hike**, a guided night hike tour in La Fortuna, Alajuela, Costa Rica. The production domain is:

- `https://www.arenalnighthike.com`

The main business goal is direct tour conversion through Peek Pro booking, WhatsApp, email/contact form, and SEO visibility for Arenal/La Fortuna night hike and night walk searches.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Local fonts from `@fontsource/inter` and `@fontsource/marcellus`
- Main scripts:
  - `npm.cmd run dev`
  - `npm.cmd run build`
  - `npm.cmd run start`
  - `npm.cmd run lint`

## Localization And Routes

The site is bilingual:

- English: `/en`
- Spanish: `/es`

Locales and route constants live in `lib/constants.ts`.

Important routes:

- `/en`, `/es`
- `/en/faq`, `/es/faq`
- `/en/about`, `/es/nosotros`
- `/en/terms-and-conditions`, `/es/terminos-y-condiciones`
- `/en/cancellation-policy`, `/es/politicas-de-cancelacion`
- `/en/thank-you`, `/es/gracias`

Text content is dictionary-driven:

- `lib/dictionaries/en.ts`
- `lib/dictionaries/es.ts`

When changing user-facing text, update both dictionaries unless intentionally changing only one locale.

## Core Business Constants

Business-wide values live in `lib/constants.ts`:

- `SITE_URL`
- `TOUR`
- `IMAGES`
- `ROUTES`
- locale helpers
- Peek Pro booking URL
- WhatsApp URL builder

Prefer updating these constants instead of duplicating values across components.

## Main Homepage Structure

The localized homepage is `app/[locale]/page.tsx`.

It renders:

- `Header`
- `Hero`
- `BenefitsSection`
- `TourCard`
- `WildlifeSection`
- `PeekBookingWidget`
- `ReviewsSection`
- `ContactSection`
- `Footer`
- JSON-LD via `SeoJsonLd`

## Booking And Conversion

Booking is handled through Peek Pro:

- Booking URL is in `TOUR.peekUrl`
- Booking button logic is in `components/PeekBookingButton.tsx`
- Site CTA scroll-to-booking button is in `components/BookingButton.tsx`

WhatsApp conversion is handled through:

- `whatsappUrl()` in `lib/constants.ts`
- `components/WhatsAppButton.tsx`

Contact form API:

- `app/api/contact/route.ts`

## Tracking And Consent

Tracking event helpers live in `tracking/events.ts`.

GA4/GTM/Search Console related components:

- `components/GoogleAnalytics.tsx`
- `components/GoogleTagManager.tsx`
- `components/GoogleSearchConsoleVerification.tsx`
- `components/TrackingManager.tsx`
- `components/CookieBanner.tsx`

Current preferred tracking mode is GA4 direct using:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Search Console verification uses:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

Do not change tracking, consent, sitemap, or robots when fixing structured data unless explicitly requested.

## SEO And Structured Data

Metadata helpers:

- `lib/seo.ts`

JSON-LD helpers:

- `lib/schema.ts`

The homepage emits a graph containing:

- `LocalBusiness`
- `TouristAttraction`
- `Product`
- `Offer`
- `Review`
- `AggregateRating`

Recent Search Console fixes:

- Added `Product.image` using absolute URLs from `IMAGES`.
- Added `Product.review` using visible Tripadvisor review excerpts.
- Added `Product.aggregateRating` calculated from the same visible reviews.

Review data is centralized in:

- `data/tripadvisor-reviews.json`
- `lib/reviews.ts`

`ReviewsSection` and `baseBusinessSchema()` both use `lib/reviews.ts` so the visible UI and schema do not drift.

Important decision: `shippingDetails` and `hasMerchantReturnPolicy` are currently intentionally omitted from `Offer`. Search Console may show them as optional non-critical warnings, but they do not fit naturally because this is a tour service, not a shipped physical product. Do not add fake shipping/returns data just to silence warnings.

## Reviews Policy

Only use review data that is already displayed publicly on the page. Current aggregate rating represents the visible verified review excerpts, not the full Tripadvisor total unless that total is later added as maintained data.

Do not add `datePublished` to review schema unless review dates are changed to precise ISO dates. Current local dates are month labels such as `May 2026`.

## Sitemap And Robots

Files:

- `app/sitemap.ts`
- `app/robots.ts`

The sitemap includes indexable public pages and intentionally excludes thank-you/gracias conversion pages.

The root `/` redirects to `/en` in `proxy.ts`.

## Verification Checklist

For most code or SEO changes, run:

- `npm.cmd run build`
- `npm.cmd run lint`

For structured data changes:

- Serve the production build locally with `next start`.
- Inspect `/en` and `/es` HTML for JSON-LD.
- Confirm Search Console live test after deploy.

For homepage schema specifically, verify `Product` includes:

- `image`
- `review`
- `aggregateRating`
- `offers`

## Working Conventions

- Keep changes scoped.
- Preserve the bilingual route structure.
- Prefer shared constants/helpers over duplicated literals.
- Avoid unrelated refactors.
- Do not revert user changes.
- Use existing design and component patterns.
