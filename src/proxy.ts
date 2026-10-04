import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const protectedRoute = [
    "/cart",
    "/checkout",
    "/profile",
    "/wishlist",
    "/orders",
  ];
  const protectAuth = ["/login", "/register"];
  const pathName = request.nextUrl.pathname;

  const myToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const accessToken = myToken?.token;

  if (
    accessToken &&
    protectAuth.some(
      (route) => pathName === route || pathName.startsWith(`${route}/`),
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !accessToken &&
    protectedRoute.some(
      (route) => pathName === route || pathName.startsWith(`${route}/`),
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout",
    "/checkout/:path*",
    "/profile/:path*",
    "/wishlist/:path*",
    "/orders",
    "/orders/:path*",
    "/login",
    "/register",
  ],
};
