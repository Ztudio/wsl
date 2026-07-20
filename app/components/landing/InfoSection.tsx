import { ArrowButton } from "./shared";

const featureCards = [
  {
    title: "Payouts that land",
    body: "Send payroll, contractor and supplier payments across MENA with local delivery and no correspondent-bank deductions.",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85",
    large: true,
  },
  {
    title: "Real rates,\nclear fees.",
    body: "Know the full delivered amount before you send. No hidden spread, no surprise deductions.",
  },
  {
    title: "One flow,\nfully connected.",
    body: "Start in the dashboard, automate with API and webhooks, and keep every status change visible.",
  },
];

export function InfoSection() {
  return (
    <section id="platform" className="bg-[#F5F5F5] px-6 py-24">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-16 grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <div>
            <h2
              className="mb-8 text-4xl font-medium leading-tight text-black md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Meet WSL.
            </h2>
            <ArrowButton compact href="#how-it-works">
              Discover it
            </ArrowButton>
          </div>

          <p className="text-balance text-2xl leading-relaxed text-black/70 md:text-3xl">
            WSL is a cross-border payments platform built corridor by corridor for
            MENA — moving value with digital dollars, converting locally and settling
            into the account your recipient already uses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            className="min-h-80 rounded-2xl bg-cover bg-center p-7 lg:col-span-2"
            style={{ backgroundImage: `url(${featureCards[0].image})` }}
          >
            <div className="flex min-h-80 flex-col justify-between">
              <h3
                className="max-w-xs text-2xl font-medium leading-snug text-black"
                style={{ letterSpacing: "-0.02em" }}
              >
                {featureCards[0].title}
              </h3>
              <p className="max-w-xs text-base text-black/70">{featureCards[0].body}</p>
            </div>
          </article>

          {featureCards.slice(1).map((card) => (
            <article
              key={card.title}
              className="flex min-h-80 flex-col justify-between rounded-2xl bg-[#2B2644] p-7"
            >
              <h3 className="whitespace-pre-line text-2xl font-medium text-white">
                {card.title}
              </h3>
              <p className="text-base text-white/60">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
