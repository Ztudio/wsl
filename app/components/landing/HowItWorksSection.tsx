import Image from "next/image";

const steps: Array<[string, string, string]> = [
  ["1", "Fund", "Add money by local bank transfer or supported collection rail."],
  ["2", "Convert", "WSL locks the rate and moves value over stablecoin settlement infrastructure."],
  ["3", "Deliver", "Recipients receive local currency in their bank account or wallet, often within minutes."],
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.16em] text-white/50">How it works</p>
          <h2
            className="text-4xl font-medium leading-tight md:text-6xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Local in. Digital in the middle. Local out.
          </h2>
        </div>

        <figure className="mb-14 overflow-hidden rounded-[28px] bg-white p-2 shadow-2xl shadow-black/30 ring-1 ring-white/15 sm:p-3">
          <Image
            src="/wsl-pay-how-it-works.svg"
            width={1163}
            height={554}
            alt="Animated WSL Pay flow from business AED accounts through approval and conversion to employee EGP payouts"
            className="block h-auto w-full"
            unoptimized
          />
          <figcaption className="sr-only">
            Business funds move through WSL approval, licensed partner conversion, and employee payouts.
          </figcaption>
        </figure>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, body]) => (
            <article key={number} className="rounded-2xl bg-white/8 p-7 ring-1 ring-white/10">
              <span className="mb-16 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                {number}
              </span>
              <h3 className="mb-3 text-2xl font-medium">{title}</h3>
              <p className="leading-relaxed text-white/60">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
