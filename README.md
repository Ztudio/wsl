This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
Cloudflare Turnstile server-side and sends the enquiry through Cloudflare Email Service
to `tech@wslpay.com` (the temporary testing recipient).

Before deploying, onboard `wslpay.com` in **Compute > Email Service > Email Sending**
and create a Turnstile widget for the deployed hostname. Configure its public key when
building and its secret in Cloudflare:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key> pnpm build
pnpm wrangler secret put TURNSTILE_SECRET
pnpm wrangler deploy
```

The Worker sends from `contact@wslpay.com`, so the domain must be verified in Email
Service. The `CONTACT_EMAIL` binding restricts delivery to `tech@wslpay.com`; update
that allowlist and the Worker recipient together when the test recipient changes.
