This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`pnpm dev` runs Next.js and the local Cloudflare Worker behind the same origin. This
makes the form's `/api/contact` route work locally while preserving Next's static
export for production. Use `pnpm dev:next` only when working on UI that does not need
the contact API.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare

This app is configured for static export (`output: "export"` in `next.config.ts`), so it builds to a plain static `out/` directory with no server runtime required. It deploys as a Cloudflare Workers Static Assets project (`wrangler.toml`'s `[assets] directory = "./out"`), Cloudflare's current recommended path for static sites.

**Via the Cloudflare dashboard (Git integration):**

1. Connect this repo as a Workers project.
2. Build command: `pnpm build`
3. Deploy command: `npx wrangler deploy`

**Via Wrangler CLI:**

```bash
pnpm build
npx wrangler deploy
```

Local preview: `pnpm preview` (runs `wrangler dev` against the built `out/` directory).

## Contact form

The form submits to the first-party Worker route, `/api/contact`. The Worker validates
Cloudflare Turnstile server-side, then forwards the enquiry to
[FormSubmit](https://formsubmit.co)'s AJAX endpoint, which emails it to `tech@wslpay.com`.
This avoids needing a verified sending domain in Cloudflare Email Service.

Create a Turnstile widget for the deployed hostname, then configure its public key when
building and its secret in Cloudflare:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key> pnpm build
pnpm wrangler secret put TURNSTILE_SECRET
pnpm wrangler deploy
```

The checked-in contact component includes the current widget's public site key as a
production fallback, so dashboard and CLI builds cannot accidentally omit the widget.
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` can still override it when rotating widgets. The
secret remains exclusively in Cloudflare's secret store.

The recipient lives in `FORMSUBMIT_ENDPOINT` in `worker/index.ts` — update it if the
recipient changes. **FormSubmit requires a one-time confirmation**: the first enquiry
sent to a new address triggers a confirmation email that must be opened and confirmed
before further submissions are delivered.

Turnstile remains mandatory in production. The combined local dev server passes a
`LOCAL_DEV` flag to Wrangler, which bypasses Turnstile only when the Worker itself is
running on `localhost` or `127.0.0.1`. Test the local endpoint directly with:

```bash
curl -i http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000' \
  --data '{"name":"Local test","email":"you@example.com","message":"Testing the local contact API.","honeypot":"","turnstileToken":""}'
```
