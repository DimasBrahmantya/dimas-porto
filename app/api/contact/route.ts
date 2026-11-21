import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();
    const honeypot = (body.website || "").trim();

    // Silent accept for spam bots that fill hidden honeypot field
    if (honeypot) {
      return NextResponse.json({
        ok: true,
        message: "Message received.",
      });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const formattedSubject = subject
      ? `[Portfolio] ${subject}`
      : `New Portfolio Inquiry from ${name}`;

    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL ||
      ["dimasbrahmantyaaryasena", "gmail.com"].join("@");

    // 1. Resend (recommended for production on Vercel)
    if (process.env.RESEND_API_KEY) {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: email,
          subject: formattedSubject,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\nMessage:\n${message}`,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({
          ok: true,
          provider: "resend",
          message: "Message delivered via Resend.",
        });
      }

      const errText = await resendRes.text();
      return NextResponse.json(
        {
          ok: false,
          error: `Email delivery failed (${resendRes.status}). ${errText.slice(0, 120)}`,
        },
        { status: 502 }
      );
    }

    // 2. Formspree endpoint (if configured)
    if (process.env.FORMSPREE_ENDPOINT) {
      const formspreeRes = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject: formattedSubject,
          message,
        }),
      });

      if (formspreeRes.ok) {
        return NextResponse.json({
          ok: true,
          provider: "formspree",
          message: "Message delivered via Formspree.",
        });
      }

      return NextResponse.json(
        {
          ok: false,
          error: "Could not deliver message via Formspree. Please try again later.",
        },
        { status: 502 }
      );
    }

    // 3. Server-side fallback via FormSubmit (keeps recipient email out of client HTML)
    const formSubmitRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _subject: formattedSubject,
          message,
          _captcha: "false",
        }),
      }
    );

    if (formSubmitRes.ok) {
      return NextResponse.json({
        ok: true,
        provider: "formsubmit",
        message: "Message delivered to inbox.",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service could not process your request right now. Please try again shortly.",
      },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request payload or network interruption.",
      },
      { status: 500 }
    );
  }
}
