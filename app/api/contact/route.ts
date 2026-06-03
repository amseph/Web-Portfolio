import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload) {
  const name = getTrimmedString(payload.name);
  const email = getTrimmedString(payload.email);
  const subject = getTrimmedString(payload.subject);
  const message = getTrimmedString(payload.message);

  if (!name) {
    return { error: "Name is required." };
  }

  if (!email || !emailPattern.test(email)) {
    return { error: "A valid email address is required." };
  }

  if (!subject) {
    return { error: "Subject is required." };
  }

  if (!message) {
    return { error: "Message is required." };
  }

  return { data: { name, email, subject, message } };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessageHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function createContactEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = formatMessageHtml(message);

  return `
    <div style="margin:0;padding:32px;background:#101014;color:#f8f4e8;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;border:3px solid #d6a84f;background:#17171f;box-shadow:8px 8px 0 #050507;">
        <div style="padding:22px 24px;border-bottom:3px solid #d6a84f;background:#21190f;">
          <p style="margin:0 0 8px;color:#d6a84f;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
            NPC Dialogue
          </p>
          <h1 style="margin:0;color:#fff7d6;font-size:26px;line-height:1.25;font-weight:800;">
            New Portfolio Message
          </h1>
        </div>

        <div style="padding:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #3a3328;color:#d6a84f;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;width:110px;">Name</td>
              <td style="padding:14px 0;border-bottom:1px solid #3a3328;color:#f8f4e8;font-size:15px;line-height:1.6;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #3a3328;color:#d6a84f;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;">Email</td>
              <td style="padding:14px 0;border-bottom:1px solid #3a3328;font-size:15px;line-height:1.6;">
                <a href="mailto:${safeEmail}" style="color:#8fd7ff;text-decoration:none;font-weight:700;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #3a3328;color:#d6a84f;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;">Subject</td>
              <td style="padding:14px 0;border-bottom:1px solid #3a3328;color:#f8f4e8;font-size:15px;line-height:1.6;">${safeSubject}</td>
            </tr>
          </table>

          <div style="margin-top:22px;padding:18px;border:2px solid #d6a84f;background:#101014;">
            <p style="margin:0 0 10px;color:#d6a84f;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;">Message</p>
            <p style="margin:0;color:#f8f4e8;font-size:16px;line-height:1.7;">${safeMessage}</p>
          </div>
        </div>

        <div style="padding:16px 24px;border-top:3px solid #d6a84f;background:#121218;">
          <p style="margin:0;color:#a7a18f;font-size:12px;line-height:1.5;">
            Sent from ivanjaurigue.vercel.app
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    return NextResponse.json(
      { success: false, error: "Contact email is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = validatePayload(payload);

  if ("error" in result) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = result.data;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      html: createContactEmailHtml({ name, email, subject, message }),
      text: [
        "New Portfolio Message",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
        "",
        "Sent from ivanjaurigue.vercel.app",
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
