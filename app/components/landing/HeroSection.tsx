"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import Image from "next/image";

const riseEase = [0.25, 1, 0.5, 1] as const;
const backOut = [0.34, 1.56, 0.64, 1] as const;
const showcaseFeatures = [
  "Payroll",
  "Contractors",
  "Suppliers",
  "Treasury movement",
  "Collections",
] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
    <section id="home" className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-6 pb-16 pt-20 text-center [font-family:var(--font-inter-tight)] md:px-10 md:pb-24 md:pt-24">
      <m.div
        className="inline-flex items-center gap-2.5 rounded-lg bg-black/[0.055] py-1 pl-1 pr-3"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: reduceMotion ? 0 : 0.7 }}
      >
        <span className="flex h-[22px] min-w-9 items-center justify-center rounded-md bg-white px-2 text-[10px] font-semibold tracking-[0.08em] shadow-sm">
          WSL
        </span>
        <span className="text-sm text-black/70">
          Payments. Conversion. Settlement.
        </span>
      </m.div>

      <h1
        className="mt-6 max-w-[1160px] text-[52px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[64px] md:text-[88px]"
        aria-label="Money moves. Borders don't."
      >
        <span className="block">
          <AnimatedWords text="Money moves." delayStart={0.9} />
        </span>
        <span className="block">
          <m.span
            className="relative mx-1.5 inline-block h-[68px] w-[68px] overflow-hidden rounded-full align-middle ring-1 ring-black/10 sm:h-[82px] sm:w-[82px] md:mx-2 md:h-[104px] md:w-[104px]"
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: backOut, delay: reduceMotion ? 0 : 1.35 }}
          >
            <Image
              src="/nixole/payment-hero.png"
              alt=""
              fill
              sizes="(min-width: 768px) 104px, (min-width: 640px) 82px, 68px"
              className="object-cover object-center"
            />
          </m.span>{" "}
          <span className="text-black/20">
            <AnimatedWords text="Borders don't." delayStart={1.1} />
          </span>
        </span>
      </h1>

      <m.p
        className="mt-8 max-w-[760px] text-base leading-[1.6] text-black/50 sm:text-lg"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: reduceMotion ? 0 : 1.8 }}
      >
        Pay teams, contractors and suppliers across MENA in local currency, with
        transparent conversion and stablecoin-powered settlement in minutes.
      </m.p>

      <m.div
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: riseEase, delay: reduceMotion ? 0 : 2.05 }}
      >
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-6 py-3 text-[15px] font-medium shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-colors hover:bg-black/[0.04]"
        >
          Move with WSL
        </a>
        <m.a
          href="#how-it-works"
          className="inline-flex min-h-11 items-center rounded-full bg-[#F6D64A] px-6 py-3 text-[15px] font-semibold text-black shadow-[0_8px_24px_rgba(246,214,74,0.24)]"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          See how it works
        </m.a>
      </m.div>

      <HeroShowcase reduceMotion={Boolean(reduceMotion)} />
    </section>
    </LazyMotion>
  );
}

function HeroShowcase({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <m.div
      className="hero-mesh-showcase mt-16 w-full overflow-hidden rounded-[28px] p-5 text-left md:p-7"
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: riseEase, delay: reduceMotion ? 0 : 2.35 }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-[22px] bg-[#1E1D19] p-6 text-white md:overflow-visible md:p-7">
          <span className="flex h-[22px] w-fit items-center justify-center rounded-[6px] bg-white px-2 text-xs font-medium text-[#111114]">
            WSL in practice
          </span>
          <h2 className="mt-5 text-[28px] font-medium leading-[1.15] tracking-tight">
            Payment modes
          </h2>
          <p className="mt-auto max-w-[260px] pt-6 text-base leading-[1.25] text-white/40">
            WSL supports payroll, contractors, suppliers, treasury movement,
            collections and embedded payment workflows.
          </p>

          <div className="mt-8 w-full md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[330px]">
            <Image
              src="/nixole/browser-mockup.png"
              alt="Payment operations dashboard"
              width={641}
              height={584}
              className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            />
          </div>

          <div
            className="absolute bottom-5 right-5 z-10 hidden h-[222px] w-[210px] flex-col rounded-[13.654px] border border-white/35 p-3 backdrop-blur-[60px] lg:flex"
            style={{
              background:
                "linear-gradient(164deg, rgba(255,255,255,0.05) 14.62%, rgba(255,255,255,0.38) 85.2%)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/nixole/programming-arrow.svg"
                alt=""
                width={14}
                height={14}
              />
              <span className="text-[13px] font-medium">Payment modes</span>
            </div>
            <div className="-mx-3 mb-2 h-px bg-white/20" />
            <div className="space-y-1">
              {showcaseFeatures.map((feature) => {
                const active = feature === "Suppliers";
                return (
                  <div
                    className={
                      active
                        ? "flex items-center gap-2 rounded bg-white px-1 py-1.5 text-xs font-medium text-black"
                        : "flex items-center gap-2 px-1 py-1.5 text-xs font-medium text-white/90"
                    }
                    key={feature}
                  >
                    <span
                      className={
                        active
                          ? "flex h-3 w-3 items-center justify-center rounded-sm bg-[#F6D64A] text-white"
                          : "h-3 w-3 rounded-sm bg-white/15"
                      }
                    >
                      {active ? "✓" : null}
                    </span>
                    {feature}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-[22px] bg-white p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/nixole/frame-207.svg"
                alt=""
                width={132}
                height={44}
                className="h-11 w-auto"
              />
              <span className="text-[15px] font-medium text-black">
                WSL in practice
              </span>
            </div>
            <div className="flex flex-col gap-1" aria-hidden="true">
              <span className="h-8 w-1 rounded-full bg-black" />
              <span className="h-4 w-1 rounded-full bg-black/15" />
            </div>
          </div>

          <p className="mt-12 text-[13px] text-black/45">Europe ⇄ Egypt</p>
          <blockquote className="mt-2 max-w-[420px] text-[22px] font-medium leading-[1.3] tracking-tight text-black">
            Built corridor by corridor.{" "}
            <span className="text-black/35">Deep, not thin.</span>
          </blockquote>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <Image
              src="/nixole/nutanix-avatar.svg"
              alt=""
              width={148}
              height={28}
              className="h-7 w-auto opacity-70"
            />
            <div className="flex items-center gap-1 text-[#E9C832]" aria-hidden="true">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start gap-6 px-1 text-white md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-[13px] leading-[1.5] text-white/75">
          Built with licensed partners
          <br />
          and institutional-grade controls.
        </p>
        <div className="flex flex-wrap items-center gap-8 text-sm font-semibold tracking-[0.08em] text-white/75">
          <span>LOCAL BANKS</span>
          <span>USDC</span>
          <span>FX PARTNERS</span>
          <Image
            src="/nixole/upside-logo.svg"
            alt=""
            width={100}
            height={24}
            className="h-6 w-auto opacity-80"
          />
        </div>
      </div>
    </m.div>
  );
}

function AnimatedWords({
  text,
  delayStart,
}: {
  text: string;
  delayStart: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          key={word}
        >
          <m.span
            className="inline-block"
            initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: riseEase,
              delay: reduceMotion ? 0 : delayStart + index * 0.05,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </m.span>
        </span>
      ))}
    </>
  );
}
