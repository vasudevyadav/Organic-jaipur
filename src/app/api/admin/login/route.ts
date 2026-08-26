import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, adminSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password;
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  if (
    !configuredPassword ||
    !password ||
    typeof password !== "string" ||
    password !== configuredPassword
  ) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await adminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 503 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
