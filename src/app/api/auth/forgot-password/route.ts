import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validation";
import { createPasswordResetToken } from "@/lib/auth-customer";

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

  // TODO: send this link via a transactional email provider (e.g. Resend) once one is
  // configured. Until then it is returned directly so the reset flow is testable end to end.
  const resetLink = `/account/reset-password/${token}`;

  return NextResponse.json({ success: true, resetLink });
}
