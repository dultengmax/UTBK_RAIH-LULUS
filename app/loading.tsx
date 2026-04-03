import { BrandLogo } from "@/components/brand-logo"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#071426] text-white">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-white/4 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex justify-center">
            <BrandLogo
              theme="light"
              subtitle="Memuat halaman"
              titleClassName="text-white"
              subtitleClassName="text-white/65"
              logoWrapperClassName="border-white/10"
            />
          </div>

          <div className="space-y-4">
            <div className="mx-auto flex justify-center gap-2">
              <span className="size-3 rounded-full bg-sky-300 animate-pulse" />
              <span className="size-3 rounded-full bg-primary animate-pulse [animation-delay:120ms]" />
              <span className="size-3 rounded-full bg-cyan-200 animate-pulse [animation-delay:240ms]" />
            </div>

            <h2 className="text-2xl font-semibold text-white">Menyiapkan halaman</h2>
            <p className="text-sm leading-relaxed text-white/60">
              Konten sedang dimuat. Halaman akan segera tampil sepenuhnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
