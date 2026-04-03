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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#081528]/90 px-6 backdrop-blur-xl">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[130px]" />
        <div className="absolute left-[12%] top-[18%] size-40 rounded-full bg-sky-500/10 blur-[100px]" />
        <div className="absolute bottom-[12%] right-[10%] size-44 rounded-full bg-cyan-400/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl">
        <div className="mb-8 flex justify-center">
          <BrandLogo
            theme="light"
            subtitle={SUCCESS_COPY.badge}
            titleClassName="text-white"
            subtitleClassName="text-white/65"
            logoWrapperClassName="border-white/10"
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
            className="relative z-10 flex size-28 items-center justify-center rounded-full border border-primary/25 bg-primary/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
          >
            <svg viewBox="0 0 64 64" className="size-14 text-primary" fill="none" aria-hidden="true">
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
          <h2 className="text-3xl font-bold text-white">{SUCCESS_COPY.title}</h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white/65">
            {SUCCESS_COPY.description}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">{SUCCESS_COPY.redirectLabel}</p>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <AnimButton onClick={() => router.push(redirectTo)}>{SUCCESS_COPY.secondary}</AnimButton>
        </div>
      </div>
    </div>
  )
}
