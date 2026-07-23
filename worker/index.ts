interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  TURNSTILE_SECRET: string;
}

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/tech@wslpay.com";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeypot?: unknown;
  turnstileToken?: unknown;
};

const json = (body: Record<string, string>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=UTF-8", "Cache-Control": "no-store" },
  });

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function validateTurnstile(token: string, request: Request, secret: string) {
  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: request.headers.get("CF-Connecting-IP") ?? "",
    }),
  });
  return (await verification.json()) as { success?: boolean };
}

async function submitContact(request: Request, env: Env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    return json({ error: "Invalid request origin." }, 403);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid form submission." }, 400);
  }

  if (payload.honeypot) return json({ ok: "true" });

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (!name || name.length > 120 || !isEmail(email) || !message || message.length > 5_000) {
    return json({ error: "Please complete the form with a valid work email." }, 400);
  }
  if (!token || !env.TURNSTILE_SECRET) {
    return json({ error: "Please complete the verification and try again." }, 400);
  }

  const challenge = await validateTurnstile(token, request, env.TURNSTILE_SECRET);
  if (!challenge.success) return json({ error: "Verification expired. Please try again." }, 403);

  const forward = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `WSL enquiry from ${name}`,
      _replyto: email,
    }),
  });
  if (!forward.ok) return json({ error: "We couldn't send that just now. Please try again shortly." }, 502);

  return json({ ok: "true" });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === "/api/contact") return submitContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
