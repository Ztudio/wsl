"use client";

import { LiquidGlassCard } from "@/components/uilayouts/liquid-glass";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoIcon } from "./shared";

const links = ["Platform", "Corridors", "How it works", "Security", "Company"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 px-6 pt-6 md:px-12">
      <LiquidGlassCard
        draggable={false}
        borderRadius="12px"
        blurIntensity="sm"
        glowIntensity="sm"
        shadowIntensity="sm"
        className="flex w-full items-center justify-between px-4 py-2"
      >
        <a href="#" className="relative z-30 flex items-center gap-2 text-black" aria-label="wsl home">
          <LogoIcon className="h-7 w-7 text-black" />
          <span className="text-2xl font-medium tracking-tight">wsl</span>
          <span className="text-base text-black/50">وصل</span>
        </a>

        <div className="relative z-30 hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
              className="rounded-lg px-3 py-1.5 text-sm text-black/60 transition-all duration-300 hover:bg-black/5 hover:text-black"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="relative z-30 hidden rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-gray-100 md:block"
        >
          Talk to us
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="relative z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </LiquidGlassCard>

      {open && (
        <LiquidGlassCard
          draggable={false}
          borderRadius="12px"
          blurIntensity="sm"
          glowIntensity="sm"
          shadowIntensity="sm"
          className="mt-3 w-full p-4 md:hidden"
        >
          <div className="relative z-30 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-black hover:bg-black/10"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-white px-5 py-3 text-center text-sm font-medium text-black"
            >
              Talk to us
            </a>
          </div>
        </LiquidGlassCard>
      )}
    </header>
  );
}
