"use client";

import { Menu, X } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { LogoIcon } from "./shared";

const links = ["Platform", "Corridors", "How it works", "Security", "Company"];
const riseEase = [0.25, 1, 0.5, 1] as const;
const backOut = [0.34, 1.56, 0.64, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
    <header className="relative z-30 mx-auto w-full max-w-[1400px] px-6 pt-6 [font-family:var(--font-inter-tight)] md:px-10 md:pt-8">
      <div className="flex min-h-11 items-center justify-between">
        <a href="#" className="flex min-h-11 items-center gap-2 text-black" aria-label="WSL home">
          <m.span
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: backOut }}
          >
            <LogoIcon className="h-[38px] w-[38px] text-black" />
          </m.span>
          <span className="text-[28px] font-semibold tracking-[-0.045em]">wsl</span>
          <span lang="ar" dir="rtl" className="text-base text-black/40">وصل</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
          {links.map((link, index) => (
            <m.a
              key={link}
              href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
              className={`flex min-h-11 items-center text-[15px] font-medium transition-colors ${
                index === 0
                  ? "text-black underline decoration-[1.5px] underline-offset-[6px]"
                  : "text-black/45 hover:text-black"
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: riseEase,
                delay: reduceMotion ? 0 : 0.45 + index * 0.08,
              }}
            >
              {link}
            </m.a>
          ))}
        </nav>

        <m.a
          href="#contact"
          className="hidden min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-colors hover:bg-black/[0.04] md:inline-flex"
          initial={reduceMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: backOut, delay: reduceMotion ? 0 : 0.75 }}
        >
          Talk to us
        </m.a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="absolute left-6 right-6 top-[76px] rounded-2xl border border-black/10 bg-white p-3 shadow-xl md:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-4 text-sm font-medium text-black/65 hover:bg-black/[0.04] hover:text-black"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white"
            >
              Talk to us
            </a>
          </nav>
        </div>
      ) : null}
    </header>
    </LazyMotion>
  );
}
