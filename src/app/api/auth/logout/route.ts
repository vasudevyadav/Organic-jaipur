import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_SESSION_COOKIE, deleteSessionByToken } from "@/lib/auth-customer";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (token) {
    await deleteSessionByToken(token);
  }
  const res = NextResponse.json({ success: true });
  res.cookies.delete(CUSTOMER_SESSION_COOKIE);
  return res;
}
