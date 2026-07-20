"use client";

import { ArrowRight, RefreshCw, Send, Wallet } from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

const steps: Array<{ number: string; title: string; body: string; icon: LucideIcon }> = [
  {
    number: "01",
    title: "Fund",
    body: "Add money by local bank transfer or supported collection rail.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Convert",
    body: "WSL locks the rate and moves value over stablecoin settlement infrastructure.",
    icon: RefreshCw,
  },
  {
    number: "03",
    title: "Deliver",
    body: "Recipients receive local currency in their bank account or wallet, often within minutes.",
    icon: Send,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-black px-6 py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[#7C3AED]/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#2B2644]/60 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-[88rem]">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-3 text-sm uppercase tracking-[0.16em] text-white/50">How it works</p>
          <h2
            className="text-4xl font-medium leading-tight md:text-6xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Local in. Digital in the middle. Local out.
          </h2>
        </motion.div>

        <div className="relative grid gap-4 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-0 top-14 hidden md:block">
            {[1, 2].map((connector) => (
              <motion.div
                key={connector}
                className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                style={{ left: `${connector === 1 ? 33.33 : 66.66}%`, marginLeft: "-16px" }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.3 + connector * 0.15 }}
              >
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: connector * 0.3 }}
                >
                  <ArrowRight size={18} className="text-white/30" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.article
                key={step.number}
                className="group relative rounded-2xl bg-white/8 p-7 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.09] hover:ring-white/20"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                <span className="absolute right-7 top-7 text-sm font-semibold text-white/25">
                  {step.number}
                </span>

                <div className="mb-16 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white to-white/80 text-black shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(124,58,237,0.6)] transition-transform duration-300 group-hover:scale-105">
                  <StepIcon size={22} strokeWidth={2} />
                </div>

                <h3 className="mb-3 text-2xl font-medium">{step.title}</h3>
                <p className="leading-relaxed text-white/60">{step.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
