import { LiquidGlassCard } from "@/components/uilayouts/liquid-glass";
import { AnimatedHeading, FadeIn } from "./motion";

export function HeroSection() {
  return (
    <section className="flex flex-1 flex-col justify-end px-6 pb-12 pt-12 md:px-12 lg:pb-16">
      <div className="w-full gap-10 lg:grid lg:grid-cols-2 lg:items-end">
        <div>
          <AnimatedHeading
            lines={["Money moves.", "Borders don't."]}
            className="mb-4 text-4xl font-normal leading-[0.98] text-white md:text-5xl lg:text-6xl xl:text-7xl"
            ariaLabel="Money moves. Borders don't."
          />

          <FadeIn
            as="p"
            delay={800}
            duration={1000}
            className="mb-5 max-w-2xl text-base text-gray-300 md:text-lg"
          >
            Pay teams, contractors and suppliers across MENA in local currency, with
            transparent conversion and stablecoin-powered settlement in minutes.
          </FadeIn>

          <FadeIn delay={1200} duration={1000} className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors duration-300 hover:bg-gray-100"
            >
              Move with WSL
            </a>

            <a href="#how-it-works" className="relative z-10 block">
              <LiquidGlassCard
                draggable={false}
                borderRadius="12px"
                blurIntensity="sm"
                glowIntensity="sm"
                shadowIntensity="sm"
                className="border border-white/20 px-8 py-3"
              >
                <span className="relative z-30 font-medium text-white">See how it works</span>
              </LiquidGlassCard>
            </a>
          </FadeIn>
        </div>

        <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
          <FadeIn delay={1400} duration={1000}>
            <LiquidGlassCard
              borderRadius="12px"
              blurIntensity="sm"
              glowIntensity="sm"
              shadowIntensity="sm"
              className="border border-white/20 px-6 py-3"
            >
              <p className="relative z-30 text-lg font-light md:text-xl lg:text-2xl">
                Payments. Conversion. Settlement.
              </p>
            </LiquidGlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
