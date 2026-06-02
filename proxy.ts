import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PAGE_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store"
};

function withPageCacheHeaders(response: NextResponse) {
  Object.entries(PAGE_CACHE_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return withPageCacheHeaders(
      NextResponse.redirect(new URL("/en", request.url))
    );
  }

  return withPageCacheHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"
  ]
};
