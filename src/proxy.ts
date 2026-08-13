import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isValidAdminToken } from "@/lib/auth";
import { CUSTOMER_SESSION_COOKIE, getUserByToken } from "@/lib/auth-customer";

const ACCOUNT_PUBLIC_PATHS = [
  "/account/login",
  "/account/register",
  "/account/forgot-password",
];

function isAccountPublicPath(pathname: string): boolean {
  return (
    ACCOUNT_PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/account/reset-password/")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // --- Admin gate (unchanged) ---
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isProtectedAdminApi =
    (pathname.startsWith("/api/products") && method !== "GET") ||
    (pathname === "/api/contact" && method === "GET") ||
    pathname.startsWith("/api/admin");

  if (isAdminPage || isProtectedAdminApi) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (await isValidAdminToken(token)) {
      return NextResponse.next();
    }
    if (isAdminPage) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Customer account gate ---
  // /api/orders intentionally stays open here: POST creates an order (guest checkout
  // is allowed), and there is no GET "list mine" endpoint — account pages read orders
  // directly via Prisma in server components after checking the session themselves.
  const isAccountPage = pathname.startsWith("/account") && !isAccountPublicPath(pathname);
  const isProtectedAccountApi = pathname.startsWith("/api/account");

  if (isAccountPage || isProtectedAccountApi) {
    const token = request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value;
    const user = await getUserByToken(token);
    if (user) {
      return NextResponse.next();
    }
    if (isAccountPage) {
      const loginUrl = new URL("/account/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/products/:path*",
    "/api/contact",
    "/api/admin/:path*",
    "/account/:path*",
    "/api/account/:path*",
  ],
};
