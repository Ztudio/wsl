import { ArrowRight } from "lucide-react";

export function UseCasesSection() {
  return (
    <section id="corridors" className="bg-[#F5F5F5] px-6 py-24">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="md:pr-12 md:pt-2">
          <p className="mb-2 text-sm text-black/60">WSL in practice</p>
          <h2
            className="mb-6 text-5xl font-medium leading-none md:text-6xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Payment modes
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-black/60">
            WSL supports payroll, contractors, suppliers, treasury movement,
            collections and embedded payment workflows — all through one regional
            platform.
          </p>
        </div>

        <div className="relative min-h-[720px] overflow-hidden rounded-3xl">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 p-8 md:p-12">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-black/55">
              Europe → Egypt
            </p>
            <h3
              className="mb-5 text-4xl font-medium leading-tight md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Payroll that arrives locally.
            </h3>
            <p className="mb-8 max-w-md text-base text-black/70">
              Fund in EUR, move value over stablecoin rails and deliver EGP directly
              to Egyptian bank accounts — with transparent rates, recipient-level
              tracking and no SWIFT dependency.
            </p>

            <a href="#how-it-works" className="group inline-flex items-center gap-3 font-medium text-black">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-colors group-hover:bg-white">
                <ArrowRight size={16} />
              </span>
              Know more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
