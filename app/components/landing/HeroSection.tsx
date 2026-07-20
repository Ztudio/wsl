import type { CSSProperties } from "react";
import { ArrowButton } from "./shared";

const railBrands: Array<[string, CSSProperties]> = [
  ["AED", { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: 15 }],
  ["EGP", { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: 13 }],
  ["EUR", { fontFamily: "Trebuchet MS, sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: 15, fontStyle: "italic" }],
  ["USD", { fontFamily: "Courier New, monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: 13 }],
  ["GBP", { fontFamily: "Palatino, serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 16 }],
  ["SAR", { fontFamily: "Impact, Arial Narrow, sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: 14 }],
  ["USDC", { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: 13 }],
];

function HeroMarquee() {
  const all = [...railBrands, ...railBrands];

  return (
    <div className="mt-24 w-full max-w-md overflow-hidden">
      <div className="marquee-track">
        {all.map(([name, style], index) => (
          <span
            key={`${name}-${index}`}
            className="mx-7 shrink-0 whitespace-nowrap text-black/60"
            style={style}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="flex-1 px-6 pb-6 pt-20">
      <div
        className="video-tint relative mx-auto h-full w-full max-w-[88rem] overflow-hidden rounded-2xl"
        style={{ height: "calc(100vh - 96px)" }}
      >
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 flex h-full flex-col items-start justify-start p-7 pt-32 sm:p-10 sm:pt-36 md:p-12 md:pt-36">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-black/55">
              Cross-border payments for MENA
            </p>

            <h1
              className="mb-4 max-w-xl text-5xl font-medium leading-tight text-black md:text-6xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              Money moves.
              <br />
              Borders don&rsquo;t.
            </h1>

            <p className="mb-8 max-w-lg font-sans text-base leading-relaxed text-black/70 md:text-lg">
              Pay teams, contractors and suppliers across MENA in local currency, with
              transparent conversion, stablecoin-powered settlement and delivery to
              local bank accounts and wallets in minutes.
            </p>

            <ArrowButton>Move with WSL</ArrowButton>
          </div>

          <HeroMarquee />
        </div>
      </div>
    </section>
  );
}
