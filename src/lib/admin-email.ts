import type { ContactSubmission, Order, OrderItem } from "@prisma/client";
import nodemailer from "nodemailer";
import { BUSINESS, SITE_URL } from "@/lib/constants";

type AdminOrder = Order & { items: OrderItem[] };

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]!));

const formatMoney = (value: number) => `₹${value.toFixed(2)}`;

function emailShell({ eyebrow, title, intro, content, accent = "#315c3b" }: {
  eyebrow: string; title: string; intro: string; content: string; accent?: string;
}) {
  return `<!doctype html><html><body style="margin:0;background:#f6f1e5;font-family:Arial,Helvetica,sans-serif;color:#173c2b">
  <div style="display:none;max-height:0;overflow:hidden">${escapeHtml(intro)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1e5;padding:28px 12px"><tr><td align="center">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff;border:1px solid #e5dece;border-radius:20px;overflow:hidden;box-shadow:0 12px 36px rgba(23,60,43,.09)">
  <tr><td style="height:6px;background:${accent}"></td></tr><tr><td style="padding:28px 34px 22px;background:#173c2b;color:#fff">
  <div style="font-family:Georgia,serif;font-size:27px;font-weight:bold">Organic <span style="color:#e7ad42">Jaipur</span></div>
  <div style="margin-top:5px;font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:#d8e2dc">Farm to home · Admin notification</div></td></tr>
  <tr><td style="padding:30px 34px 10px"><div style="font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${accent}">${escapeHtml(eyebrow)}</div>
  <h1 style="margin:9px 0 8px;font-family:Georgia,serif;font-size:29px;line-height:1.2;color:#173c2b">${escapeHtml(title)}</h1>
  <p style="margin:0;color:#65766d;font-size:14px;line-height:1.7">${escapeHtml(intro)}</p></td></tr>
  <tr><td style="padding:18px 34px 34px">${content}</td></tr>
  <tr><td style="padding:22px 34px;background:#faf7ee;border-top:1px solid #ebe4d4;text-align:center;color:#77837c;font-size:11px;line-height:1.6">
  <strong style="color:#315c3b">Organic Jaipur</strong> · ${escapeHtml(BUSINESS.phoneDisplay)} · ${escapeHtml(BUSINESS.email)}<br>
  Automatic website notification · Customer information is for fulfilment use only.</td></tr></table></td></tr></table></body></html>`;
}

const detailRow = (label: string, value: string) => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee8dc;color:#78837d;font-size:12px;width:38%">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #eee8dc;color:#173c2b;font-size:13px;font-weight:600">${escapeHtml(value)}</td></tr>`;

async function sendEmail(subject: string, html: string) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const recipients = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (gmailUser && gmailAppPassword && recipients) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      });
      await transporter.sendMail({
        from: `Organic Jaipur <${gmailUser}>`,
        to: recipients.split(",").map((email) => email.trim()).filter(Boolean),
        replyTo: process.env.ORDER_REPLY_TO || gmailUser,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error(`Gmail admin email failed (${subject})`, error);
      return false;
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  if (!apiKey || !recipients || !from) {
    console.error(`Admin email not sent (${subject}): Gmail SMTP or Resend environment variables are missing.`);
    return false;
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: recipients.split(",").map((email) => email.trim()).filter(Boolean),
      reply_to: process.env.ORDER_REPLY_TO || undefined,
      subject,
      html,
    }),
    cache: "no-store",
  });
  if (!response.ok) console.error(`Admin email failed (${subject}): ${response.status}`);
  return response.ok;
}

async function sendWhatsApp(text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_ADMIN_NUMBER;
  const apiVersion = process.env.WHATSAPP_GRAPH_API_VERSION;
  const templateName = process.env.WHATSAPP_NOTIFICATION_TEMPLATE;
  if (!token || !phoneNumberId || !recipient || !apiVersion) {
    console.error("WhatsApp admin notification not sent: WhatsApp environment variables are missing.");
    return false;
  }
  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${encodeURIComponent(phoneNumberId)}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient.replace(/\D/g, ""),
      ...(templateName
        ? {
            type: "template",
            template: {
              name: templateName,
              language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en" },
              components: [{ type: "body", parameters: [{ type: "text", text: text.slice(0, 1024) }] }],
            },
          }
        : { type: "text", text: { preview_url: false, body: text.slice(0, 4096) } }),
    }),
    cache: "no-store",
  });
  if (!response.ok) console.error(`WhatsApp admin notification failed: ${response.status}`);
  return response.ok;
}

export async function notifyAdminOfOrder(order: AdminOrder) {
  const address = [order.addressLine1, order.addressLine2, order.city, order.state, order.pincode].filter(Boolean).join(", ");
  const productText = order.items.map((item) => `${item.productName} (${item.unit}) x ${item.quantity} - ₹${(item.unitPrice * item.quantity).toFixed(2)}`).join("\n");
  const itemRows = order.items.map((item) => `<tr><td style="padding:12px 8px;border-bottom:1px solid #eee8dc;font-size:13px"><strong>${escapeHtml(item.productName)}</strong><br><span style="font-size:11px;color:#849087">${escapeHtml(item.unit)} · ${formatMoney(item.unitPrice)} each</span></td><td align="center" style="padding:12px 8px;border-bottom:1px solid #eee8dc;font-size:13px">${item.quantity}</td><td align="right" style="padding:12px 8px;border-bottom:1px solid #eee8dc;font-size:13px;font-weight:bold">${formatMoney(item.unitPrice * item.quantity)}</td></tr>`).join("");
  const held = order.status === "MANUAL_APPROVAL_REQUIRED";
  const adminUrl = `${SITE_URL}/admin/orders/${encodeURIComponent(order.id)}`;
  const content = `<div style="margin-bottom:20px;padding:14px 16px;border-radius:12px;background:${held ? "#fff2e8" : "#edf6ef"};border:1px solid ${held ? "#efc09b" : "#cbe0d0"}"><span style="font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${held ? "#b55424" : "#315c3b"}">${escapeHtml(order.status.replaceAll("_", " "))}</span>${order.approvalReason ? `<p style="margin:7px 0 0;color:#774329;font-size:13px;line-height:1.5">${escapeHtml(order.approvalReason)}</p>` : ""}</div>
  <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:19px">Customer &amp; delivery</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${detailRow("Order number", order.orderNumber)}${detailRow("Customer", order.customerName)}${detailRow("Phone", order.customerPhone)}${detailRow("Email", order.customerEmail || "Not provided")}${detailRow("Address", address)}${detailRow("Payment method", order.paymentMethod)}</table>
  <h2 style="margin:28px 0 8px;font-family:Georgia,serif;font-size:19px">Order items</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr style="background:#faf7ee;color:#67756d"><th align="left" style="padding:10px 8px;font-size:11px">PRODUCT</th><th style="padding:10px 8px;font-size:11px">QTY</th><th align="right" style="padding:10px 8px;font-size:11px">TOTAL</th></tr>${itemRows}</table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px">${detailRow("Subtotal", formatMoney(order.subtotal))}${detailRow(`Discount${order.couponCode ? ` (${order.couponCode})` : ""}`, `−${formatMoney(order.discount)}`)}${detailRow("Shipping", formatMoney(order.shippingFee))}<tr><td style="padding:15px 0;font-size:14px;font-weight:bold">Final payable</td><td align="right" style="padding:15px 0;font-family:Georgia,serif;font-size:24px;font-weight:bold;color:#315c3b">${formatMoney(order.total)}</td></tr></table>
  <div style="text-align:center;margin-top:20px"><a href="${adminUrl}" style="display:inline-block;background:#315c3b;color:#fff;text-decoration:none;border-radius:999px;padding:13px 24px;font-size:13px;font-weight:bold">View order in Admin</a></div>`;
  const html = emailShell({ eyebrow: held ? "Action required" : "New order received", title: held ? `Review order ${order.orderNumber}` : `Order ${order.orderNumber}`, intro: held ? "This order is on hold and needs an admin decision before processing." : "A new order has been placed and is ready for your team.", content, accent: held ? "#c76532" : "#315c3b" });
  const whatsapp = [
    order.status === "MANUAL_APPROVAL_REQUIRED" ? "⚠️ Order needs manual approval" : "🛒 New Organic Jaipur order",
    `Order: ${order.orderNumber}`, `Customer: ${order.customerName}`, `Phone: ${order.customerPhone}`,
    `Total: ₹${order.total.toFixed(2)}`, `Payment: ${order.paymentMethod}`, `Status: ${order.status}`,
    `Address: ${address}`, "Products:", productText,
    ...(order.approvalReason ? [`Reason: ${order.approvalReason}`] : []),
  ].join("\n");
  const subject = held ? `⚠ Action required — ${order.orderNumber}` : `New Organic Jaipur order — ${order.orderNumber}`;
  await Promise.allSettled([sendEmail(subject, html), sendWhatsApp(whatsapp)]);
}

export async function notifyAdminOfContact(submission: ContactSubmission) {
  const subject = `New website enquiry — ${submission.name}`;
  const content = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${detailRow("Name", submission.name)}${detailRow("Email", submission.email)}${detailRow("Phone", submission.phone || "Not provided")}</table><div style="margin-top:24px;padding:20px;border-left:4px solid #e7ad42;border-radius:10px;background:#faf7ee;color:#354d40;font-size:14px;line-height:1.7">${escapeHtml(submission.message).replace(/\n/g, "<br>")}</div><div style="margin-top:22px;text-align:center"><a href="mailto:${encodeURIComponent(submission.email)}" style="display:inline-block;background:#315c3b;color:#fff;text-decoration:none;border-radius:999px;padding:13px 24px;font-size:13px;font-weight:bold">Reply to customer</a></div>`;
  const html = emailShell({ eyebrow: "Website enquiry", title: `Message from ${submission.name}`, intro: "A customer has submitted the Organic Jaipur contact form.", content });
  const whatsapp = [`📩 New Organic Jaipur contact enquiry`, `Name: ${submission.name}`, `Email: ${submission.email}`, `Phone: ${submission.phone || "Not provided"}`, `Message: ${submission.message}`].join("\n");
  await Promise.allSettled([sendEmail(subject, html), sendWhatsApp(whatsapp)]);
}
