interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

// shortcut: in-memory per-instance rate limit resets on serverless cold starts, move to Vercel WAF or Redis if spam scales
const rateHits = new Map<string, number[]>();

function isRateLimited(ip: string, now = Date.now()): boolean {
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (rateHits.get(ip) || []).filter((t) => t > cutoff);
  if (recent.length >= RATE_MAX_REQUESTS) {
    rateHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateHits.set(ip, recent);
  if (rateHits.size > 1000) {
    for (const [key, times] of rateHits) {
      if (times.every((t) => t <= cutoff)) rateHits.delete(key);
    }
  }
  return false;
}

const asString = (value: unknown) => (typeof value === "string" ? value : "");
const stripLineBreaks = (value: unknown) =>
  asString(value).replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return Response.json(
        { ok: false, error: "Too many messages sent. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactPayload;
    const name = stripLineBreaks(body?.name);
    const email = asString(body?.email).trim();
    const subject = stripLineBreaks(body?.subject);
    const message = asString(body?.message).trim();
    const honeypot = asString(body?.website).trim();

    // Silent accept for spam bots that fill hidden honeypot field
    if (honeypot) {
      return Response.json({
        ok: true,
        message: "Message received.",
      });
    }

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      return Response.json(
        { ok: false, error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return Response.json(
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
        return Response.json({
          ok: true,
          provider: "resend",
          message: "Message delivered via Resend.",
        });
      }

      return Response.json(
        {
          ok: false,
          error: "Could not deliver message right now. Please try again later.",
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
        return Response.json({
          ok: true,
          provider: "formspree",
          message: "Message delivered via Formspree.",
        });
      }

      return Response.json(
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
      return Response.json({
        ok: true,
        provider: "formsubmit",
        message: "Message delivered to inbox.",
      });
    }

    return Response.json(
      {
        ok: false,
        error:
          "Email service could not process your request right now. Please try again shortly.",
      },
      { status: 502 }
    );
  } catch {
    return Response.json(
      {
        ok: false,
        error: "Invalid request payload or network interruption.",
      },
      { status: 500 }
    );
  }
}
