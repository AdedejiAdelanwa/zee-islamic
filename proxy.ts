import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Extract locale from the first path segment (/en/... or /ar/...)
  const locale = request.nextUrl.pathname.split("/")[1] ?? "en";
  const response = NextResponse.next();
  response.headers.set("x-locale", locale === "ar" ? "ar" : "en");
  return response;
}

export const config = {
  matcher: ["/(en|ar)/:path*"],
};
