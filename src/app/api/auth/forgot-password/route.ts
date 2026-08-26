import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validation";
import { createPasswordResetToken } from "@/lib/auth-customer";
import { sendPasswordResetEmail } from "@/lib/customer-email";
import { SITE_URL } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Always respond the same way whether or not the account exists, to avoid leaking
  // which emails are registered.
  if (!user) {
    return NextResponse.json({ success: true, resetLink: null });
  }

  const { token } = await createPasswordResetToken(user.id);

  const resetLink = `/account/reset-password/${token}`;
  const sent = await sendPasswordResetEmail(user.email, `${SITE_URL}${resetLink}`);
  if (!sent) console.error("Password reset email could not be sent: email provider is not configured.");

  // Never expose a password-reset token in production. The direct link remains useful
  // in local development when an email provider is intentionally not configured.
  return NextResponse.json({
    success: true,
    resetLink: process.env.NODE_ENV === "production" ? null : resetLink,
  });
}
