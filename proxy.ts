import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales } from "@/lib/locales";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  for (const part of acceptLanguage.split(",")) {
    const language = part.split(";")[0].trim().toLowerCase();
    const base = language.split("-")[0];
    if (hasLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) {
    // Forward the locale as a header so the not-found page (which gets no
    // route params) can render in the right language.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", pathname.split("/")[1]);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip API routes, Next.js internals, and static files (anything with a dot).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
