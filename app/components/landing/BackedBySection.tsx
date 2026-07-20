import type { CSSProperties } from "react";

const backers: Array<[string, CSSProperties]> = [
  ["Licensed rails", { fontFamily: "Times New Roman, serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: 14 }],
  ["LOCAL BANKS", { fontFamily: "Arial Black, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: 16 }],
  ["USDC", { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: 18 }],
  ["Compliance", { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 17 }],
  ["FX Partners", { fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: 15 }],
  ["WEBHOOKS", { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: 14 }],
  ["API FIRST", { fontFamily: "Courier New, monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: 14 }],
  ["Treasury", { fontFamily: "Palatino, serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: 15 }],
];

export function BackedBySection() {
  const all = [...backers, ...backers];

  return (
    <section id="security" className="bg-[#F5F5F5] px-6">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-8 border-y border-black/10 py-8 md:grid-cols-4">
        <p className="whitespace-pre-line text-base leading-relaxed text-black/70">
          {"Built with licensed partners\nand institutional-grade controls."}
        </p>

        <div className="overflow-hidden md:col-span-3">
          <div className="backers-track">
            {all.map(([name, style], index) => (
              <span
                key={`${name}-${index}`}
                className="mx-10 shrink-0 whitespace-nowrap text-black/50"
                style={style}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
