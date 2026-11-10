"use client"

import { Suspense, useState, type FormEvent, type KeyboardEvent, type MouseEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react"
import { ArrowRight, BarChart3, Lock, Mail, ShieldCheck, Sparkles, Target } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { PS2Background, PS2Particles } from "@/components/ps2-background"
import { Input } from "@/components/ui/input"
import { PIXEL_PRESETS, PixelGradient } from "@/components/ui/pixel-gradient"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const HERO_FEATURES = [
  { icon: Target, title: "Simulasi Akurat", desc: "Bobot & durasi sesuai SNBT" },
  { icon: BarChart3, title: "Skor IRT", desc: "Pantau progres real-time" },
  { icon: ShieldCheck, title: "Data Aman", desc: "Enkripsi penuh & privat" },
] as const

const RAIL_ACCENTS = [
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-cyan-400",
  "bg-emerald-400",
] as const

function PasswordToggleIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
        <path
          d="M3 3 21 21M10.58 10.59a2 2 0 0 0 2.83 2.82M9.88 5.09A9.77 9.77 0 0 1 12 4.8c5.5 0 9.27 4.52 10 5.46a1.2 1.2 0 0 1 0 1.48 17.88 17.88 0 0 1-4.29 3.99M6.35 6.35A17.72 17.72 0 0 0 2 10.26a1.2 1.2 0 0 0 0 1.48c.74.94 4.51 5.46 10 5.46a9.9 9.9 0 0 0 4.04-.83"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
      <path
        d="M2 12.24c.73-.94 4.5-5.44 10-5.44s9.27 4.5 10 5.44a1.22 1.22 0 0 1 0 1.52c-.73.94-4.5 5.44-10 5.44S2.73 14.7 2 13.76a1.22 1.22 0 0 1 0-1.52Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [capsLock, setCapsLock] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email dan password wajib diisi.")
      return
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setErrorMessage("Masukkan alamat email yang valid.")
      return
    }

    setErrorMessage("")
    setSubmitting(true)

    const nextParam = searchParams.get("next")
    const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "/dashboard"
    const secureAttr = window.location.protocol === "https:" ? "; secure" : ""
    const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 6

    document.cookie = `rl_auth=1; path=/; max-age=${maxAge}; samesite=lax${secureAttr}`
    router.push(nextPath)
  }

  const checkCapsLock = (event: KeyboardEvent<HTMLInputElement>) => {
    if (typeof event.getModifierState === "function") {
      setCapsLock(event.getModifierState("CapsLock"))
    }
  }

  return (
    <div className="relative flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 lg:py-14">
      <div className="mb-10 flex justify-center text-center lg:hidden">
        <BrandLogo
          theme="dark"
          subtitle="Masuk ke akunmu"
          titleClassName="text-slate-950"
          subtitleClassName="font-pixel text-slate-500"
          logoWrapperClassName="border-white/90 shadow-sm"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mx-auto w-full max-w-md"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 font-pixel text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-500">
          <Sparkles size={12} /> Selamat datang kembali
        </span>

        <h2 className="mt-5 font-pixel text-2xl font-bold leading-snug tracking-tight text-slate-950 sm:text-3xl">
          Masuk ke <span className="gradient-text">akunmu</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Lanjutkan persiapan UTBK-mu dan lihat progres skor terbaru hari ini.
        </p>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 font-bold text-slate-900 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-md"
          type="button"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-pixel text-sm">Masuk dengan Google</span>
        </motion.button>

        <div className="relative my-7 flex items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="mx-4 flex-shrink font-pixel text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Atau Email
          </span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <form className="space-y-5" onSubmit={handleLogin} noValidate>
          <div className="group">
            <label
              htmlFor="login-email"
              className="ml-1 mb-2 block font-pixel text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Alamat Email
            </label>
            <div className="relative">
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setErrorMessage("")
                }}
                className="h-12 rounded-xl border-slate-200 bg-white pl-12 pr-4 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:ring-4 focus-visible:ring-indigo-100"
              />
              <span className="pointer-events-none absolute left-3.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 transition-colors group-focus-within:bg-indigo-100">
                <Mail size={18} aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="group">
            <div className="ml-1 mb-2 flex justify-between">
              <label
                htmlFor="login-password"
                className="font-pixel text-xs font-bold uppercase tracking-widest text-slate-500"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="font-pixel text-[10px] font-bold text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Lupa Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="********"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrorMessage("")
                }}
                onKeyDown={checkCapsLock}
                onKeyUp={checkCapsLock}
                className="h-12 rounded-xl border-slate-200 bg-white pl-12 pr-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:ring-4 focus-visible:ring-indigo-100"
              />
              <span className="pointer-events-none absolute left-3.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 transition-colors group-focus-within:bg-indigo-100">
                <Lock size={18} aria-hidden="true" />
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 text-slate-400 transition-colors hover:text-indigo-600"
              >
                <PasswordToggleIcon visible={showPassword} />
              </motion.button>
            </div>
            <AnimatePresence>
              {capsLock ? (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 ml-1 font-pixel text-[11px] font-semibold text-amber-600"
                >
                  Caps Lock sedang aktif.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setRemember((value) => !value)}
            className="flex items-center gap-2.5 font-pixel text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            <span
              className={`relative flex size-5 items-center justify-center rounded-md border transition-all ${
                remember
                  ? "border-indigo-600 bg-indigo-600 shadow-sm shadow-indigo-600/30"
                  : "border-slate-300 bg-white"
              }`}
            >
              <AnimatePresence>
                {remember ? (
                  <motion.svg
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    viewBox="0 0 24 24"
                    className="size-3.5 text-white"
                    fill="none"
                  >
                    <path
                      d="m5 13 4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ) : null}
              </AnimatePresence>
            </span>
            Ingat saya selama 7 hari
          </button>

          <AnimatePresence>
            {errorMessage ? (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600"
              >
                {errorMessage}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-[length:200%_100%] bg-left py-4 font-bold text-white shadow-xl shadow-indigo-600/25 transition-all duration-500 hover:bg-right disabled:pointer-events-none disabled:opacity-70"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {submitting ? (
              <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : null}
            <span className="font-pixel">{submitting ? "Memproses..." : "Masuk Sekarang"}</span>
            {!submitting ? (
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            ) : null}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-pixel font-bold text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-500"
          >
            Daftar Gratis
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

const LoginPage = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.12), transparent 68%)`

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] font-sans text-slate-900">
      {/* Background animasi bergaya boot screen PlayStation 2 */}
      <PS2Background />

      <div className="relative flex min-h-screen items-center justify-center p-0 sm:p-4 lg:p-6">
        <motion.div
          onMouseMove={handlePointerMove}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative grid min-h-screen w-full max-w-7xl overflow-hidden border border-white/40 bg-white/78 shadow-[0_30px_120px_rgba(1,4,15,0.6)] backdrop-blur-xl sm:min-h-0 sm:rounded-[2.5rem] lg:min-h-[680px] lg:grid-cols-[30fr_60fr_10fr]"
        >
          {/* Gradasi pixel di dalam kartu agar tetap terlihat */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
            <PixelGradient
              cols={38}
              rows={22}
              from={PIXEL_PRESETS.light.from}
              mid={PIXEL_PRESETS.light.mid}
              to={PIXEL_PRESETS.light.to}
            />
          </div>

          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 z-20"
          />

          {/* 30% — Panel Branding */}
          <aside className="relative z-10 hidden flex-col justify-between overflow-hidden border-r border-blue-100/80 p-10 text-white lg:flex">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1523240715630-974bb1ad1932?q=80&w=2070&auto=format&fit=crop"
                alt=""
                className="h-full w-full object-cover opacity-30 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-linear-to-br from-blue-700/92 via-indigo-800/94 to-violet-950/96" />
              <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen">
                <PixelGradient
                  cols={24}
                  rows={40}
                  from={PIXEL_PRESETS.hero.from}
                  mid={PIXEL_PRESETS.hero.mid}
                  to={PIXEL_PRESETS.hero.to}
                />
              </div>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 top-16 size-56 rounded-full bg-cyan-400/25 blur-3xl"
                animate={{ y: [0, 26, 0], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 bottom-24 size-48 rounded-full bg-violet-400/30 blur-3xl"
                animate={{ y: [0, -22, 0], opacity: [0.45, 0.8, 0.45] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Partikel PS2 melayang di panel branding */}
              <div className="pointer-events-none absolute inset-0 z-[1]">
                <PS2Particles variant="night" count={22} />
              </div>
            </div>

            <div className="relative z-10">
              <BrandLogo
                theme="light"
                subtitle="Platform tryout UTBK-SNBT"
                titleClassName="text-white"
                subtitleClassName="font-pixel text-blue-100/70"
                logoWrapperClassName="border-white/10"
              />
            </div>

            <div className="relative z-10">
              <h1 className="mb-5 font-pixel text-2xl font-bold leading-snug xl:text-3xl">
                Kembali Melangkah Menuju <span className="text-cyan-200">PTN Impian.</span>
              </h1>
              <p className="max-w-xs text-sm leading-relaxed text-blue-100/70">
                Ukur kemampuanmu dengan simulasi IRT paling akurat dan raih kampus impian.
              </p>

              <div className="mt-8 space-y-3">
                {HERO_FEATURES.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.09 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/10"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400/30 to-violet-400/30 text-cyan-100">
                      <feature.icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-pixel text-sm font-semibold text-white">{feature.title}</span>
                      <span className="block truncate text-xs text-blue-100/60">{feature.desc}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-indigo-700 shadow-lg"
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt=""
                  />
                ))}
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-700 bg-linear-to-br from-cyan-400 to-indigo-500 font-pixel text-[10px] font-bold shadow-lg">
                  +12k
                </div>
              </div>
              <p className="text-xs leading-snug text-blue-100/70">
                Sudah dipercaya ribuan <br /> pejuang PTN di seluruh Indonesia.
              </p>
            </div>
          </aside>

          {/* 60% — Form Login */}
          <section className="relative z-10 flex flex-col bg-white/70">
            {/* Partikel PS2 versi terang di belakang form */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <motion.div
                aria-hidden="true"
                className="absolute -left-20 top-[10%] size-64 rounded-full bg-indigo-300/30 blur-[90px]"
                animate={{ x: [0, 120, -40, 0], y: [0, 60, -20, 0], opacity: [0.4, 0.8, 0.5, 0.4] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute -right-16 bottom-[5%] size-56 rounded-full bg-blue-300/30 blur-[90px]"
                animate={{ x: [0, -100, 30, 0], y: [0, -70, 25, 0], opacity: [0.35, 0.75, 0.45, 0.35] }}
                transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: -5 }}
              />
              <PS2Particles variant="light" count={26} />
            </div>
            <div className="relative z-10 flex flex-1 flex-col justify-center">
              <Suspense
                fallback={
                  <div className="flex w-full flex-1 flex-col items-center justify-center gap-3 p-8 sm:p-12 lg:p-16">
                    <span className="size-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
                    <span className="text-sm text-slate-400">Memuat halaman masuk...</span>
                  </div>
                }
              >
                <LoginForm />
              </Suspense>
            </div>
          </section>

          {/* 10% — Rail Dekoratif */}
          <aside className="relative z-10 hidden flex-col items-center justify-between overflow-hidden border-l border-blue-100/70 bg-[linear-gradient(180deg,#eef2ff_0%,#faf5ff_50%,#eef6ff_100%)] py-10 lg:flex">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-indigo-500/15 to-transparent" />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 left-1/2 size-24 -translate-x-1/2 rounded-full bg-violet-400/25 blur-2xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Partikel PS2 kecil di rail dekoratif */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <PS2Particles variant="night" count={10} />
            </div>

            <span className="relative rotate-180 font-pixel text-[10px] font-bold uppercase tracking-[0.42em] text-indigo-400 [writing-mode:vertical-rl]">
              Tryout UTBK-SNBT
            </span>

            <div className="relative flex flex-1 flex-col items-center justify-center gap-3 py-6">
              <div className="relative h-full min-h-32 w-px bg-linear-to-b from-transparent via-indigo-300 to-transparent">
                <motion.span
                  className="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-2.5">
              {RAIL_ACCENTS.map((accent, index) => (
                <motion.span
                  key={accent}
                  className={`size-2 rounded-full ${accent}`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.55, 1, 0.55] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.28,
                  }}
                />
              ))}
            </div>

            <span className="relative mt-6 font-pixel text-[10px] font-bold uppercase tracking-[0.42em] text-violet-400 [writing-mode:vertical-rl]">
              Aman &amp; Terenkripsi
            </span>
          </aside>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
