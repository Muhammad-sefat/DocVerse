import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: Implement actual token verification
const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/dashboard/admin"];
const authorRoutes = ["/dashboard/author"];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  // TODO: Verify token and get user role
  const isAuthenticated = !!token;
  const userRole: string = "USER"; // Placeholder - replace with actual role from token

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.some((route) => pathname === route)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect dashboard routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Protect admin routes
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Protect author routes
    if (pathname.startsWith("/dashboard/author") && userRole !== "AUTHOR" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
