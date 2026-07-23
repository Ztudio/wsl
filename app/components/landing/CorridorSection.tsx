type CorridorStatus = "live" | "design-partners" | "coming-soon";

const corridors: Array<{
  title: string;
  body: string;
  status: CorridorStatus;
}> = [
  {
    title: "Europe ⇄ Egypt",
    body: "EUR funding, stablecoin settlement and local EGP delivery for payroll, contractors and suppliers.",
    status: "live",
  },
  {
    title: "UAE ⇄ Egypt",
    body: "Fast AED-to-EGP business payments with local recipient delivery and end-to-end tracking.",
    status: "design-partners",
  },
  {
    title: "GCC ⇄ Saudi Arabia",
    body: "Local SAR delivery for teams and suppliers across the Gulf's largest economy.",
    status: "coming-soon",
  },
  {
    title: "MENA ⇄ Global",
    body: "USD, EUR and GBP payouts and collections connecting the region to global markets.",
    status: "coming-soon",
  },
];

const statusStyles: Record<
  CorridorStatus,
  { label: string; className: string }
> = {
  live: {
    label: "Live — pilot",
    className:
      "border-[#D9B412] bg-[#F6D64A] text-black shadow-[0_1px_0_rgba(0,0,0,0.08)]",
  },
  "design-partners": {
    label: "Design partners",
    className: "border-[#CDA900] bg-transparent text-[#8A7200]",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "border-[#D7D7D2] bg-[#E7E7E3] text-black/45",
  },
};

export function CorridorSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.16em] text-black/50">Corridors</p>
          <h2
            className="text-4xl font-medium leading-tight md:text-6xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Built corridor by corridor. Deep, not thin.
          </h2>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {corridors.map(({ title, body, status }) => {
            const statusStyle = statusStyles[status];

            return (
              <div
                key={title}
                className="grid gap-4 py-7 md:grid-cols-[1.1fr_1.7fr_auto] md:items-center md:gap-8"
              >
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="text-black/60">{body}</p>
                <span
                  className={`inline-flex min-h-9 w-fit min-w-[148px] items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${statusStyle.className}`}
                  aria-label={`Corridor status: ${statusStyle.label}`}
                >
                  {statusStyle.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
