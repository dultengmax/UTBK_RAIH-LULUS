"use client"

import { startTransition, useEffect, useState, useEffectEvent } from "react"
import { AnimatePresence, motion } from "motion/react"

import { BrandLogo } from "@/components/brand-logo"
import { BRAND } from "@/lib/brand"

const loadingSteps = [
  {
    label: "Menyiapkan sesi",
    detail: "Menyusun tampilan dan konteks halaman yang akan dibuka.",
  },
  {
    label: "Memuat data penting",
    detail: "Mengambil komponen utama agar pengalaman masuk terasa cepat dan mulus.",
  },
  {
    label: "Merapikan interaksi",
    detail: "Menyiapkan elemen visual dan state awal sebelum halaman tampil penuh.",
  },
]

const pulseDots = [
  { className: "bg-sky-300", left: "50%", top: "0%", x: "-50%", y: "-50%" },
  { className: "bg-primary", left: "100%", top: "50%", x: "-50%", y: "-50%" },
  { className: "bg-cyan-200", left: "50%", top: "100%", x: "-50%", y: "-50%" },
  { className: "bg-white/85", left: "0%", top: "50%", x: "-50%", y: "-50%" },
]

export default function Loading() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0.22)

  const tick = useEffectEvent(() => {
    startTransition(() => {
      setActiveStep((current) => (current + 1) % loadingSteps.length)
      setProgress((current) => (current >= 0.9 ? 0.34 : Math.min(current + 0.16, 0.94)))
    })
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      tick()
    }, 900)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="dark relative min-h-screen overflow-hidden bg-[#071426] text-white">
      <div className="absolute inset-0">
        <div className="absolute left-[-8%] top-[-12%] h-80 w-80 rounded-full bg-sky-500/16 blur-[120px]" />
        <div className="absolute bottom-[-14%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/14 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/6 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 sm:px-8">
        <div className="grid w-full gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Loading Experience
            </div>

            <div className="space-y-5">
              <BrandLogo
                theme="light"
                subtitle="Memuat pengalaman belajar"
                titleClassName="text-white"
                subtitleClassName="text-white/65"
                logoWrapperClassName="border-white/10"
              />

              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Menata tampilan terbaik sebelum {BRAND.displayName} siap dibuka.
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-white/62">
                  Kami sedang menyusun komponen penting, memuat data utama, dan merapikan
                  interaksi supaya halaman terasa cepat sekaligus tetap halus saat muncul.
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Progress sistem</p>
                  <p className="mt-1 text-sm text-white/55">State loading bergerak dinamis sampai halaman siap.</p>
                </div>
                <motion.span
                  key={Math.round(progress * 100)}
                  initial={{ scale: 0.92, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-full border border-primary/20 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {Math.round(progress * 100)}%
                </motion.span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  animate={{ scaleX: progress }}
                  style={{ transformOrigin: "left center" }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-primary to-cyan-200"
                />
              </div>

              <div className="mt-5 space-y-3">
                {loadingSteps.map((step, index) => {
                  const isActive = index === activeStep
                  const isDone = index < activeStep

                  return (
                    <motion.div
                      key={step.label}
                      animate={{
                        borderColor: isActive
                          ? "rgba(34,211,238,0.34)"
                          : "rgba(255,255,255,0.08)",
                        backgroundColor: isActive
                          ? "rgba(8,145,178,0.12)"
                          : "rgba(255,255,255,0.02)",
                      }}
                      transition={{ duration: 0.18 }}
                      className="flex items-start gap-4 rounded-2xl border px-4 py-3"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isDone || isActive ? "rgba(34,211,238,0.95)" : "rgba(255,255,255,0.04)",
                          borderColor: isDone || isActive ? "rgba(34,211,238,0.95)" : "rgba(255,255,255,0.12)",
                          scale: isActive ? [1, 1.08, 1] : 1,
                        }}
                        transition={
                          isActive
                            ? { duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }
                            : { duration: 0.2 }
                        }
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border"
                      >
                        {isDone ? (
                          <svg viewBox="0 0 20 20" className="size-3.5 text-slate-950" fill="none" aria-hidden="true">
                            <path
                              d="M5 10.5 8.4 14 15 7.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <span className={isActive ? "size-2 rounded-full bg-slate-950" : "size-2 rounded-full bg-white/35"} />
                        )}
                      </motion.div>

                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">{step.label}</p>
                        <p className="text-sm leading-relaxed text-white/55">{step.detail}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Workspace preview</p>
                  <p className="mt-1 text-sm text-white/55">Indikator visual bahwa halaman sedang disiapkan.</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-rose-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-300/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
              </div>

              <div className="relative mt-8 flex justify-center">
                <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-white/10"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-6 rounded-full border border-dashed border-primary/25"
                  />
                  <motion.div
                    animate={{ scale: [0.96, 1.02, 0.96], opacity: [0.45, 0.8, 0.45] }}
                    transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute inset-12 rounded-full border border-cyan-200/20 bg-cyan-300/5"
                  />

                  {pulseDots.map((dot, index) => (
                    <motion.span
                      key={`${dot.className}-${index}`}
                      className={`absolute size-3 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.32)] ${dot.className}`}
                      style={{
                        left: dot.left,
                        top: dot.top,
                        transform: `translate(${dot.x}, ${dot.y})`,
                      }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.45, 1, 0.45],
                      }}
                      transition={{
                        duration: 1.9,
                        delay: index * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative z-10 w-full max-w-[14rem] rounded-[1.75rem] border border-white/10 bg-[#0d1e36]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <BrandLogo
                        href=""
                        theme="light"
                        showName={false}
                        size={44}
                        logoWrapperClassName="border-white/10"
                      />
                      <motion.div
                        animate={{ opacity: [0.45, 1, 0.45] }}
                        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                        className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"
                      >
                        Syncing
                      </motion.div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <motion.div
                        animate={{ width: ["56%", "84%", "56%"] }}
                        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="h-3 rounded-full bg-white/75"
                      />
                      <motion.div
                        animate={{ width: ["88%", "72%", "88%"] }}
                        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="h-2 rounded-full bg-white/12"
                      />
                      <motion.div
                        animate={{ width: ["72%", "94%", "72%"] }}
                        transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="h-2 rounded-full bg-white/10"
                      />
                    </div>

                    <div className="mt-6 grid gap-3">
                      {[0, 1, 2].map((row) => (
                        <div
                          key={`preview-row-${row}`}
                          className="rounded-2xl border border-white/8 bg-white/[0.03] p-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <motion.div
                              animate={{ width: ["34%", "52%", "34%"] }}
                              transition={{
                                duration: 2 + row * 0.25,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              className="h-2 rounded-full bg-white/60"
                            />
                            <motion.div
                              animate={{ opacity: [0.35, 0.9, 0.35] }}
                              transition={{
                                duration: 1.4 + row * 0.2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              className="size-2 rounded-full bg-primary"
                            />
                          </div>

                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                            <motion.div
                              animate={{ scaleX: [0.25, 0.8, 0.25] }}
                              transition={{
                                duration: 2.1 + row * 0.15,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              style={{ transformOrigin: "left center" }}
                              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadingSteps[activeStep]?.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.24 }}
                    className="space-y-2"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/38">
                      Active Process
                    </p>
                    <p className="text-lg font-semibold text-white">{loadingSteps[activeStep]?.label}</p>
                    <p className="text-sm leading-relaxed text-white/58">
                      {loadingSteps[activeStep]?.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
