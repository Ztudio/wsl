"use client";

import Script from "next/script";
import { FormEvent, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAD8QQkORyLa0Igus";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    submittingRef.current = true;
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: new FormData(form).get("name"),
          email: new FormData(form).get("email"),
          message: new FormData(form).get("message"),
          honeypot: new FormData(form).get("_honey"),
          turnstileToken: new FormData(form).get("cf-turnstile-response"),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "We couldn’t send that just now. Please try again shortly.");
      }
      form.reset();
      window.turnstile?.reset();
      setStatus("success");
    } catch (error) {
      window.turnstile?.reset();
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t send that just now. Please try again shortly.",
      );
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <section id="contact" className="bg-[#2B2644] px-6 py-24 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.16em] text-white/45">Get started</p>
        <h2 className="text-4xl font-medium leading-tight md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
          Move your first payment this month.
        </h2>
        <p className="my-6 max-w-2xl text-lg leading-relaxed text-white/60">
          We&rsquo;re onboarding a limited number of design partners across the region.
          Tell us your corridor and volumes — we&rsquo;ll show you exactly what you could
          save in cost and settlement time.
        </p>

        <form onSubmit={submitForm} className="grid w-full gap-4 text-left sm:grid-cols-2">
          <input
            type="text"
            name="_honey"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <label className="grid gap-2 text-sm font-medium">
            Name
            <input required name="name" autoComplete="name" className="min-h-11 rounded-lg border border-white/20 bg-white/10 px-4 text-base outline-none transition focus:border-white focus:ring-2 focus:ring-white/40" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Work email
            <input required type="email" name="email" autoComplete="email" className="min-h-11 rounded-lg border border-white/20 bg-white/10 px-4 text-base outline-none transition focus:border-white focus:ring-2 focus:ring-white/40" />
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            How can we help?
            <textarea required name="message" rows={4} className="min-h-28 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base outline-none transition focus:border-white focus:ring-2 focus:ring-white/40" />
          </label>
          {turnstileSiteKey ? (
            <div className="flex min-h-[65px] justify-center sm:col-span-2">
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
              <div
                className="cf-turnstile"
                data-sitekey={turnstileSiteKey}
                data-action="turnstile-spin-v2"
                data-theme="light"
              />
            </div>
          ) : null}
          <button disabled={status === "sending"} className="min-h-11 justify-self-center rounded-full bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-white/90 disabled:cursor-wait disabled:opacity-70 sm:col-span-2" type="submit">
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>
        </form>

        <p className="mt-5 min-h-6 text-sm text-white/65" aria-live="polite">
          {status === "success" && "Thanks — your enquiry has been sent. We’ll be in touch shortly."}
          {status === "error" && errorMessage}
        </p>
        <p className="text-sm text-white/45">hello@wslpay.com · Dubai, UAE</p>
      </div>
    </section>
  );
}
