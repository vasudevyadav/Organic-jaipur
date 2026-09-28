import nodemailer from "nodemailer";
import type { Order, OrderItem } from "@prisma/client";
import { BUSINESS, SITE_URL } from "@/lib/constants";

type CustomerOrder = Order & { items: OrderItem[] };

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]!));

const formatMoney = (value: number) => `₹${value.toFixed(2)}`;

async function sendCustomerEmail(to: string, subject: string, html: string): Promise<boolean> {
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
      console.error(`Customer email failed via Gmail (${subject})`, error);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  if (!apiKey || !from) {
    console.error(`Customer email not sent (${subject}): Gmail SMTP or Resend environment variables are missing.`);
    return false;
  }

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

  if (!response.ok) console.error(`Customer email failed via Resend (${subject}): ${response.status}`);
  return response.ok;
}

export async function sendOrderConfirmationEmail(order: CustomerOrder): Promise<boolean> {
  if (!order.customerEmail) return false;

  const held = order.status === "MANUAL_APPROVAL_REQUIRED";
  const address = [order.addressLine1, order.addressLine2, order.city, order.state, order.pincode].filter(Boolean).join(", ");
  const itemRows = order.items.map((item) => `<tr><td style="padding:12px 8px;border-bottom:1px solid #eee8dc;font-size:13px"><strong>${escapeHtml(item.productName)}</strong><br><span style="font-size:11px;color:#849087">${escapeHtml(item.unit)} · ${formatMoney(item.unitPrice)} each</span></td><td align="center" style="padding:12px 8px;border-bottom:1px solid #eee8dc;font-size:13px">${item.quantity}</td><td align="right" style="padding:12px 8px;border-bottom:1px solid #eee8dc;font-size:13px;font-weight:bold">${formatMoney(item.unitPrice * item.quantity)}</td></tr>`).join("");
  const trackUrl = `${SITE_URL}/track-order`;

  const statusNote = held
    ? `<div style="margin-bottom:20px;padding:14px 16px;border-radius:12px;background:#fff2e8;border:1px solid #efc09b"><span style="font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#b55424">Order under review</span><p style="margin:7px 0 0;color:#774329;font-size:13px;line-height:1.5">Our team is reviewing your order and will confirm it shortly.</p></div>`
    : `<div style="margin-bottom:20px;padding:14px 16px;border-radius:12px;background:#edf6ef;border:1px solid #cbe0d0"><span style="font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#315c3b">Order confirmed</span><p style="margin:7px 0 0;color:#2a4a35;font-size:13px;line-height:1.5">We've received your order and it's being prepared for dispatch.</p></div>`;

  const detailRow = (label: string, value: string) => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee8dc;color:#78837d;font-size:12px;width:38%">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #eee8dc;color:#173c2b;font-size:13px;font-weight:600">${escapeHtml(value)}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;background:#f6f1e5;font-family:Arial,Helvetica,sans-serif;color:#173c2b">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1e5;padding:28px 12px"><tr><td align="center">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff;border:1px solid #e5dece;border-radius:20px;overflow:hidden;box-shadow:0 12px 36px rgba(23,60,43,.09)">
  <tr><td style="height:6px;background:#315c3b"></td></tr><tr><td style="padding:28px 34px 22px;background:#173c2b;color:#fff">
  <div style="font-family:Georgia,serif;font-size:27px;font-weight:bold">Organic <span style="color:#e7ad42">Jaipur</span></div>
  <div style="margin-top:5px;font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:#d8e2dc">Farm to home</div></td></tr>
  <tr><td style="padding:30px 34px 10px"><div style="font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:#315c3b">Thank you, ${escapeHtml(order.customerName)}</div>
  <h1 style="margin:9px 0 8px;font-family:Georgia,serif;font-size:29px;line-height:1.2;color:#173c2b">Order ${escapeHtml(order.orderNumber)}</h1>
  <p style="margin:0;color:#65766d;font-size:14px;line-height:1.7">We've received your order. Here's a summary for your records.</p></td></tr>
  <tr><td style="padding:18px 34px 34px">${statusNote}
  <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:19px">Delivery details</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${detailRow("Order number", order.orderNumber)}${detailRow("Address", address)}${detailRow("Phone", order.customerPhone)}${detailRow("Payment method", order.paymentMethod === "COD" ? "Cash on Delivery" : "Paid Online")}</table>
  <h2 style="margin:28px 0 8px;font-family:Georgia,serif;font-size:19px">Order items</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr style="background:#faf7ee;color:#67756d"><th align="left" style="padding:10px 8px;font-size:11px">PRODUCT</th><th style="padding:10px 8px;font-size:11px">QTY</th><th align="right" style="padding:10px 8px;font-size:11px">TOTAL</th></tr>${itemRows}</table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px">${detailRow("Subtotal", formatMoney(order.subtotal))}${detailRow(`Discount${order.couponCode ? ` (${order.couponCode})` : ""}`, `−${formatMoney(order.discount)}`)}${detailRow("Shipping", formatMoney(order.shippingFee))}<tr><td style="padding:15px 0;font-size:14px;font-weight:bold">Total paid${order.paymentMethod === "COD" ? " on delivery" : ""}</td><td align="right" style="padding:15px 0;font-family:Georgia,serif;font-size:24px;font-weight:bold;color:#315c3b">${formatMoney(order.total)}</td></tr></table>
  <div style="text-align:center;margin-top:20px"><a href="${trackUrl}" style="display:inline-block;background:#315c3b;color:#fff;text-decoration:none;border-radius:999px;padding:13px 24px;font-size:13px;font-weight:bold">Track your order</a></div></td></tr>
  <tr><td style="padding:22px 34px;background:#faf7ee;border-top:1px solid #ebe4d4;text-align:center;color:#77837c;font-size:11px;line-height:1.6">
  <strong style="color:#315c3b">Organic Jaipur</strong> · ${escapeHtml(BUSINESS.phoneDisplay)} · ${escapeHtml(BUSINESS.email)}<br>
  Questions about your order? Just reply to this email.</td></tr></table></td></tr></table></body></html>`;

  const subject = held ? `We've received your order ${order.orderNumber}` : `Order confirmed — ${order.orderNumber}`;
  return sendCustomerEmail(order.customerEmail, subject, html);
}

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
