import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function LogoIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="14" y="14" width="68" height="68" rx="16" fill="currentColor" />
      <path
        d="M26 46 C29 56,35 56,38 47 C41 56,48 58,55 53 C63 47,63 39,57 39 C52 39,52 47,59 48"
        stroke="#F5F5F5"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowButton({
  children,
  href = "#contact",
  compact = false,
}: {
  children: ReactNode;
  href?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full bg-black text-white transition-colors duration-200 hover:bg-gray-800 ${
        compact ? "pl-6 pr-2 py-2 text-base" : "pl-8 pr-2 py-2 text-base md:text-lg"
      }`}
    >
      <span className="font-medium">{children}</span>
      <span className="flex rounded-full bg-white p-2 transition-colors duration-200 group-hover:bg-white">
        <ArrowRight size={20} className="text-black" />
      </span>
    </a>
  );
}
