import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<boolean> {
  const subject = "Reset your Organic Jaipur password";
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#173c2b">
    <h1 style="font-family:Georgia,serif">Reset your password</h1>
    <p>We received a request to reset your Organic Jaipur account password.</p>
    <p><a href="${resetUrl}" style="display:inline-block;border-radius:999px;background:#315c3b;color:#fff;padding:12px 20px;text-decoration:none;font-weight:bold">Reset password</a></p>
    <p>This link expires in one hour. If you did not request it, you can ignore this email.</p>
  </body></html>`;

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (gmailUser && gmailAppPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      });
      await transporter.sendMail({
        from: `Organic Jaipur <${gmailUser}>`,
        to,
        replyTo: process.env.ORDER_REPLY_TO || gmailUser,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error("Password reset email failed via Gmail", error);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  if (!apiKey || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: process.env.ORDER_REPLY_TO || undefined,
      subject,
      html,
    }),
    cache: "no-store",
  });

  if (!response.ok) console.error(`Password reset email failed via Resend: ${response.status}`);
  return response.ok;
}
