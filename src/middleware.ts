import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/dashboard/change-password", "/dashboard/order", "/dashboard/orders", "/dashboard/products", "/dashboard/profile-details", "/dashboard/withdraw"]; // Add your protected routes here

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuth = Boolean(accessToken);
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // ⛔ Not authenticated and trying to access protected route
  if (!isAuth && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Authenticated and trying to access login/register — redirect to home
  if (isAuth && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 👇 Apply middleware to all routes (we’ll manually control protection)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // apply to all pages except static
};
