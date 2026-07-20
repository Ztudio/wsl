"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoIcon } from "./shared";

const links = ["Platform", "Corridors", "How it works", "Security", "Company"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute left-0 right-0 top-0 z-30 px-6 py-5">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-black">
          <LogoIcon />
          <span className="text-2xl font-medium tracking-tight">wsl</span>
          <span className="text-base text-black/45">وصل</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
              className="text-base font-medium text-gray-700 transition-colors duration-200 hover:text-black"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-black px-7 py-2.5 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800"
          >
            Talk to us
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-4 max-w-[88rem] rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-black/5 hover:text-black"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-black px-5 py-3 text-center font-medium text-white"
            >
              Talk to us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
