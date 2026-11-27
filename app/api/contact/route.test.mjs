import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "./route.ts";

const makeRequest = (body, ip) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });

const originalFetch = globalThis.fetch;
const originalResendKey = process.env.RESEND_API_KEY;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalResendKey === undefined) {
    delete process.env.RESEND_API_KEY;
  } else {
    process.env.RESEND_API_KEY = originalResendKey;
  }
});

describe("POST /api/contact", () => {
  it("rejects missing required fields with 400", async () => {
    const res = await POST(makeRequest({ name: "Ada" }, "10.0.0.1"));
    assert.equal(res.status, 400);
  });

  it("rejects invalid email addresses with 400", async () => {
    const res = await POST(
      makeRequest(
        { name: "Ada", email: "not-an-email", message: "Hello" },
        "10.0.0.6"
      )
    );
    assert.equal(res.status, 400);
  });

  it("rejects oversized payloads with 400", async () => {
    const res = await POST(
      makeRequest(
        {
          name: "Ada",
          email: "ada@example.com",
          message: "x".repeat(5001),
        },
        "10.0.0.2"
      )
    );
    assert.equal(res.status, 400);
  });

  it("silently accepts honeypot submissions with 200", async () => {
    const res = await POST(
      makeRequest({ website: "https://spam.example" }, "10.0.0.3")
    );
    assert.equal(res.status, 200);
  });

  it("strips newlines from subject and hides raw Resend error details", async () => {
    process.env.RESEND_API_KEY = "test_key";
    let sentSubject = "";
    globalThis.fetch = async (_url, init) => {
      const parsed = JSON.parse(String(init?.body));
      sentSubject = parsed.subject;
      return new Response("secret_internal_resend_error", { status: 500 });
    };

    const res = await POST(
      makeRequest(
        {
          name: "Ada",
          email: "ada@example.com",
          subject: "Hello\r\nBcc: evil@example.com",
          message: "Hi there",
        },
        "10.0.0.4"
      )
    );
    const json = await res.json();

    assert.equal(res.status, 502);
    assert.equal(sentSubject, "[Portfolio] Hello Bcc: evil@example.com");
    assert.ok(!json.error.includes("secret_internal_resend_error"));
  });

  it("rate-limits after 5 requests from the same IP with 429", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest({ website: "bot" }, "10.0.0.5"));
      assert.equal(res.status, 200);
    }
    const blocked = await POST(makeRequest({ website: "bot" }, "10.0.0.5"));
    assert.equal(blocked.status, 429);
  });
});
