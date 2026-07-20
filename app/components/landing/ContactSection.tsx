export function ContactSection() {
  return (
    <section id="contact" className="bg-[#2B2644] px-6 py-24 text-white">
      <div className="mx-auto flex max-w-[88rem] flex-col items-center text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.16em] text-white/45">Get started</p>
        <h2
          className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          Move your first payment this month.
        </h2>
        <p className="my-6 max-w-2xl text-lg leading-relaxed text-white/60">
          We&rsquo;re onboarding a limited number of design partners across the region.
          Tell us your corridor and volumes — we&rsquo;ll show you exactly what you could
          save in cost and settlement time.
        </p>
        <a
          href="mailto:hello@wsl.finance?subject=WSL%20—%20let%27s%20talk"
          className="rounded-full bg-white px-8 py-4 font-medium text-black transition-colors hover:bg-white/90"
        >
          Talk to us
        </a>
        <p className="mt-5 text-sm text-white/45">hello@wsl.finance · Dubai, UAE</p>
      </div>
    </section>
  );
}
