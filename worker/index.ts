interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  TURNSTILE_SECRET?: string;
  LOCAL_DEV?: string;
  PUBLIC_SITE_ORIGIN?: string;
}

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/tech@wslpay.com";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeypot?: unknown;
  turnstileToken?: unknown;
};

type TurnstileResult = {
  success?: boolean;
  "error-codes"?: string[];
};

type FormSubmitResult = {
  success?: boolean | string;
  message?: string;
};

const json = (body: Record<string, string>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=UTF-8", "Cache-Control": "no-store" },
  });

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isLocalHostname = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

const isLocalDevelopment = (request: Request, env: Env) => {
  const requestUrl = new URL(request.url);
  return env.LOCAL_DEV === "true" && isLocalHostname(requestUrl.hostname);
};

const hasValidOrigin = (request: Request, localDevelopment: boolean) => {
  const origin = request.headers.get("Origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    if (localDevelopment) return isLocalHostname(originUrl.hostname);
    return originUrl.origin === new URL(request.url).origin;
  } catch {
    return false;
  }
};

const getDeliveryOrigin = (request: Request, env: Env) => {
  const configuredOrigin = env.PUBLIC_SITE_ORIGIN?.trim();
  if (!configuredOrigin) return new URL(request.url).origin;
  return new URL(configuredOrigin).origin;
};

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
  if (!verification.ok) {
    return { success: false, "error-codes": ["internal-error"] } satisfies TurnstileResult;
  }
  return (await verification.json()) as TurnstileResult;
}

async function submitContact(request: Request, env: Env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const localDevelopment = isLocalDevelopment(request, env);
  if (!hasValidOrigin(request, localDevelopment)) {
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
  if (!localDevelopment) {
    if (!token || !env.TURNSTILE_SECRET) {
      return json({ error: "Please complete the verification and try again." }, 400);
    }

    const challenge = await validateTurnstile(token, request, env.TURNSTILE_SECRET);
    if (!challenge.success) {
      console.warn(
        JSON.stringify({
          event: "contact_turnstile_failed",
          errorCodes: challenge["error-codes"] ?? [],
        }),
      );
      return json({ error: "Verification expired. Please try again." }, 403);
    }
  }

  const origin = getDeliveryOrigin(request, env);
  const forward = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/`,
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `WSL enquiry from ${name}`,
      _replyto: email,
    }),
  });

  if (!forward.ok) {
    console.warn(
      JSON.stringify({
        event: "contact_forward_failed",
        status: forward.status,
        message: "FormSubmit returned an HTTP error",
      }),
    );
    return json({ error: "We couldn't send that just now. Please try again shortly." }, 502);
  }

  const forwardResult = (await forward.json().catch(() => null)) as FormSubmitResult | null;
  const wasForwarded =
    forwardResult?.success === true || forwardResult?.success === "true";

  if (!wasForwarded) {
    console.warn(
      JSON.stringify({
        event: "contact_forward_failed",
        status: forward.status,
        message: forwardResult?.message ?? "Invalid FormSubmit response",
      }),
    );
    return json({ error: "We couldn't send that just now. Please try again shortly." }, 502);
  }

  return json({ ok: "true" });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === "/api/contact") return submitContact(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
