import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { notifyAdminOfContact } from "@/lib/admin-email";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;

  const submission = await prisma.contactSubmission.create({
    data: { name, email, phone: phone || null, message },
  });

  await notifyAdminOfContact(submission).catch((error) =>
    console.error("Contact notification failed", error)
  );

  return NextResponse.json({ submission }, { status: 201 });
}

export async function GET() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ submissions });
}
