const corridors: Array<[string, string, string]> = [
  ["Europe ⇄ Egypt", "EUR funding, stablecoin settlement and local EGP delivery for payroll, contractors and suppliers.", "Live — pilot"],
  ["UAE ⇄ Egypt", "Fast AED-to-EGP business payments with local recipient delivery and end-to-end tracking.", "Design partners"],
  ["GCC ⇄ Saudi Arabia", "Local SAR delivery for teams and suppliers across the Gulf's largest economy.", "Coming soon"],
  ["MENA ⇄ Global", "USD, EUR and GBP payouts and collections connecting the region to global markets.", "Coming soon"],
];

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
          {corridors.map(([title, body, status]) => (
            <div
              key={title}
              className="grid gap-4 py-7 md:grid-cols-[1.1fr_1.7fr_auto] md:items-center md:gap-8"
            >
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="text-black/60">{body}</p>
              <span className="w-fit rounded-full border border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
