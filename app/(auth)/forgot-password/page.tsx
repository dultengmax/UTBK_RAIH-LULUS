"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Input } from "@/components/ui/input"
import { BRAND } from "@/lib/brand"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESEND_COOLDOWN = 30

const transitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
}

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return

    const timer = window.setInterval(() => {
      setCooldown((value) => (value <= 1 ? 0 : value - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [cooldown])

  const sendResetLink = () => {
    setSent(true)
    setCooldown(RESEND_COOLDOWN)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setErrorMessage("Masukkan alamat email yang terdaftar.")
      return
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setErrorMessage("Masukkan alamat email yang valid.")
      return
    }

    setErrorMessage("")
    setSubmitting(true)

    // Simulasi pengiriman tautan reset. Ganti dengan pemanggilan API saat backend siap.
    window.setTimeout(() => {
      setSubmitting(false)
      sendResetLink()
    }, 900)
  }

  const handleResend = () => {
    if (cooldown > 0 || submitting) return
    sendResetLink()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.6),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(196,181,253,0.35),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_46%,#f8fbff_100%)] font-sans text-slate-900">
      <div className="pointer-events-none absolute left-[-8%] top-[-10%] size-112 rounded-full bg-blue-300/40 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-8%] bottom-[-10%] size-120 rounded-full bg-indigo-200/40 blur-[160px]" />

      <div className="relative flex min-h-screen items-center justify-center p-0 sm:p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex min-h-screen w-full max-w-5xl flex-col overflow-hidden border border-white/80 bg-white/78 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:min-h-0 sm:rounded-[2.5rem] lg:min-h-[620px] md:flex-row"
        >
          <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-blue-100/80 p-12 text-white md:flex">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 to-indigo-900/95" />
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E\")",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="mb-16">
                <BrandLogo
                  theme="light"
                  subtitle="Platform tryout UTBK-SNBT"
                  titleClassName="text-white"
                  subtitleClassName="text-blue-100/70"
                  logoWrapperClassName="border-white/10"
                />
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                Kunci Akunmu <br /> Kembali <span className="text-blue-200">dalam Sekejap.</span>
              </h1>
              <p className="max-w-sm text-lg leading-relaxed text-blue-100/70">
                Masukkan email terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang password barumu.
              </p>
            </div>

            <div className="relative z-10 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={22} className="text-blue-100" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Tautan aman &amp; sekali pakai</p>
                <p className="mt-1 text-sm leading-relaxed text-blue-100/70">
                  Demi keamanan, tautan reset hanya berlaku selama 15 menit setelah dikirim.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="mb-12 flex justify-center text-center md:hidden">
              <BrandLogo
                theme="dark"
                subtitle="Atur ulang password"
                titleClassName="text-slate-950"
                subtitleClassName="text-slate-500"
                logoWrapperClassName="border-white/90 shadow-sm"
              />
            </div>

            <AnimatePresence mode="wait" initial={false} custom={sent ? 1 : -1}>
              {!sent ? (
                <motion.div
                  key="request"
                  custom={-1}
                  variants={transitionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-8"
                >
                  <div className="text-center md:text-left">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                      <KeyRound size={13} />
                      Lupa Password
                    </span>
                    <h2 className="text-3xl font-bold text-slate-950">Atur Ulang Password</h2>
                    <p className="mt-2 text-slate-500">
                      Masukkan email yang kamu pakai saat mendaftar. Kami akan mengirim tautan untuk membuat password baru.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="group">
                      <label
                        htmlFor="reset-email"
                        className="ml-1 mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
                      >
                        Alamat Email
                      </label>
                      <div className="relative">
                        <Input
                          id="reset-email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value)
                            setErrorMessage("")
                          }}
                          aria-invalid={Boolean(errorMessage)}
                          className="h-12 rounded-xl border-slate-200 bg-white px-12 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-400 focus-visible:ring-blue-100"
                        />
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500"
                          size={18}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

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
                      className="group flex w-full items-center justify-center space-x-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      {submitting ? (
                        <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      ) : null}
                      <span>{submitting ? "Mengirim..." : "Kirim Tautan Reset"}</span>
                      {!submitting ? (
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      ) : null}
                    </motion.button>
                  </form>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
                  >
                    <ArrowLeft size={16} />
                    Kembali ke halaman masuk
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="sent"
                  custom={1}
                  variants={transitionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-8 text-center md:text-left"
                >
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                      className="mb-6 flex size-16 items-center justify-center rounded-full border border-blue-200 bg-blue-50 shadow-[0_0_40px_rgba(59,130,246,0.16)]"
                    >
                      <svg viewBox="0 0 64 64" className="size-9 text-blue-600" fill="none" aria-hidden="true">
                        <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <motion.path
                          d="M20 33.5 28.5 42 45 25.5"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                        />
                      </svg>
                    </motion.div>

                    <h2 className="text-3xl font-bold text-slate-950">Cek Email Kamu</h2>
                    <p className="mt-2 max-w-md text-slate-500">
                      Kami telah mengirim tautan untuk mengatur ulang password ke{" "}
                      <span className="font-semibold text-slate-800">{email.trim()}</span>. Tautan berlaku selama 15 menit.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500"
                    >
                      Kembali ke Halaman Masuk
                      <ArrowRight size={18} />
                    </Link>

                    <p className="text-sm text-slate-500">
                      Tidak menerima email?{" "}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={cooldown > 0}
                        className="font-bold text-blue-600 transition-colors hover:text-blue-500 disabled:cursor-not-allowed disabled:text-slate-400"
                      >
                        {cooldown > 0 ? `Kirim ulang dalam ${cooldown}s` : "Kirim ulang"}
                      </button>
                    </p>
                  </div>

                  <p className="text-xs text-slate-400">
                    Salah alamat email?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false)
                        setCooldown(0)
                      }}
                      className="font-semibold text-blue-600 transition-colors hover:text-blue-500"
                    >
                      Ubah email
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-10 text-center text-xs text-slate-400 md:text-left">
              {BRAND.displayName} menjaga akses akunmu tetap aman dan mudah dipulihkan.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
