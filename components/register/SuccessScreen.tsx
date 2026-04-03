"use client"

import { useEffect, useEffectEvent } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"

import { SUCCESS_COPY, SUCCESS_PARTICLES } from "@/data/registerData"
import { BrandLogo } from "@/components/brand-logo"
import { AnimButton } from "@/components/ui/AnimButton"

interface SuccessScreenProps {
  redirectTo: string
}

export function SuccessScreen({ redirectTo }: SuccessScreenProps) {
  const router = useRouter()
  const handleRedirect = useEffectEvent(() => {
    router.push(redirectTo)
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      handleRedirect()
    }, 2600)

    return () => window.clearTimeout(timer)
  }, [handleRedirect])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[rgba(239,246,255,0.88)] px-6 backdrop-blur-xl">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/40 blur-[130px]" />
        <div className="absolute left-[12%] top-[18%] size-40 rounded-full bg-sky-300/35 blur-[100px]" />
        <div className="absolute bottom-[12%] right-[10%] size-44 rounded-full bg-emerald-200/35 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-xl rounded-[2rem] border border-white/[0.85] bg-white/[0.88] p-8 text-center shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
        <div className="mb-8 flex justify-center">
          <BrandLogo
            theme="dark"
            subtitle={SUCCESS_COPY.badge}
            titleClassName="text-slate-950"
            subtitleClassName="text-slate-500"
            logoWrapperClassName="border-white shadow-sm"
          />
        </div>

        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
          {SUCCESS_PARTICLES.map((particle, index) => (
            <motion.span
              key={`particle-${particle.x}-${particle.y}-${index}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: [0, 1, 0],
                scale: [0.2, 1, 0.6],
              }}
              transition={{
                delay: particle.delay,
                duration: particle.duration,
                ease: "easeOut",
              }}
              className={`absolute rounded-full ${particle.colorClass}`}
              style={{ width: particle.size, height: particle.size }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
            className="relative z-10 flex size-28 items-center justify-center rounded-full border border-sky-200 bg-sky-50 shadow-[0_0_40px_rgba(14,165,233,0.16)]"
          >
            <svg viewBox="0 0 64 64" className="size-14 text-sky-600" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <motion.path
                d="M20 33.5 28.5 42 45 25.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-bold text-slate-950">{SUCCESS_COPY.title}</h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500">
            {SUCCESS_COPY.description}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{SUCCESS_COPY.redirectLabel}</p>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <AnimButton onClick={() => router.push(redirectTo)}>{SUCCESS_COPY.secondary}</AnimButton>
        </div>
      </div>
    </div>
  )
}
