import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/dashboard/order",
  "/dashboard/orders",
  "/dashboard/products",
  "/dashboard/profile-details",
  "/dashboard/withdraw",
];

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuth = Boolean(accessToken);
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ⛔ Not authenticated → protected route
  if (!isAuth && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Authenticated → login/register
  if (isAuth && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
