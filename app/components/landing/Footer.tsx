import { LogoIcon } from "./shared";

export function Footer() {
  return (
    <footer className="bg-black px-6 py-8 text-white/45">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <LogoIcon className="h-6 w-6 text-white" />
          <span className="font-medium text-white">wsl</span>
          <span>وصل</span>
        </div>
        <p className="text-sm">
          © 2026 WSL. WSL is a technology platform. Payment services are provided by licensed partners.
        </p>
      </div>
    </footer>
  );
}
