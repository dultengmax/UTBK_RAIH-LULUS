"use client"

import { useMemo } from "react"
import { motion } from "motion/react"

const NIGHT_COLORS = ["#7dd3fc", "#818cf8", "#67e8f9", "#a5b4fc", "#c4b5fd"] as const
const LIGHT_COLORS = ["#6366f1", "#3b82f6", "#38bdf8", "#818cf8", "#a78bfa"] as const

type Particle = {
  id: number
  left: string
  top: string
  size: number
  duration: number
  delay: number
  driftX: number
  driftY: number
  color: string
}

/** Pseudo-random deterministik agar konsisten antara SSR dan client (tanpa hydration mismatch). */
function seeded(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

function makeParticles(count: number, offset: number, colors: readonly string[]): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const r = (n: number) => seeded(index * 7.13 + n + offset)
    return {
      id: index,
      left: `${(r(1) * 100).toFixed(2)}%`,
      top: `${(r(2) * 100).toFixed(2)}%`,
      size: 2 + Math.round(r(3) * 3),
      duration: 9 + r(4) * 14,
      delay: -r(5) * 20,
      driftX: (r(6) - 0.5) * 90,
      driftY: (r(7) - 0.5) * 90,
      color: colors[index % colors.length],
    }
  })
}

/**
 * Partikel cahaya melayang ala boot screen PlayStation 2.
 * - variant "night": titik terang bercahaya untuk area gelap
 * - variant "light": titik indigo lembut untuk area putih/terang
 */
export function PS2Particles({
  variant = "night",
  count = 26,
}: {
  variant?: "night" | "light"
  count?: number
}) {
  const particles = useMemo(
    () =>
      makeParticles(
        count,
        variant === "light" ? 100 : 0,
        variant === "light" ? LIGHT_COLORS : NIGHT_COLORS,
      ),
    [count, variant],
  )
  const peakOpacity = variant === "light" ? 0.55 : 0.9

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            x: [0, particle.driftX, particle.driftX * -0.4, 0],
            y: [0, particle.driftY, particle.driftY * -0.4, 0],
            opacity: [0.1, peakOpacity, peakOpacity * 0.4, 0.1],
            scale: [1, 1.6, 1, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  )
}

/**
 * Background animasi bergaya boot screen PlayStation 2:
 * langit biru pekat, orb cahaya yang melayang pelan,
 * pita cahaya bergerak, partikel berkilau, plus scanline CRT halus.
 */
export function PS2Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Langit deep-space biru khas boot PS2 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b2148_0%,#051233_42%,#01040f_100%)]" />

      {/* Orb nebula yang drift pelan */}
      <motion.div
        className="absolute -left-40 top-[-15%] size-[34rem] rounded-full bg-blue-500/20 blur-[120px]"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 20, 0], opacity: [0.35, 0.7, 0.45, 0.35] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-48 bottom-[-20%] size-[38rem] rounded-full bg-indigo-500/20 blur-[140px]"
        animate={{ x: [0, -50, 25, 0], y: [0, 35, -20, 0], opacity: [0.3, 0.65, 0.4, 0.3] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[110px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pita cahaya (light ribbon) ala streak boot PS2 */}
      <motion.div
        className="absolute -left-1/4 top-[36%] h-44 w-[150%] -rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),rgba(37,99,235,0.12)_45%,transparent_70%)] blur-3xl"
        animate={{ x: [0, 70, -40, 0], opacity: [0.35, 0.8, 0.5, 0.35], scale: [1, 1.06, 0.98, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-1/3 bottom-[10%] h-36 w-[160%] rotate-[4deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.24),rgba(139,92,246,0.1)_45%,transparent_70%)] blur-3xl"
        animate={{ x: [0, -80, 45, 0], opacity: [0.3, 0.75, 0.45, 0.3], scale: [1, 1.08, 0.97, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: -6 }}
      />

      {/* Partikel cahaya melayang seperti "dust" boot PS2 */}
      <PS2Particles variant="night" count={48} />

      {/* Scanline CRT halus era PS2 */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(148,197,255,0.05)_0px,rgba(148,197,255,0.05)_1px,transparent_1px,transparent_3px)]" />

      {/* Vignette gelap di tepi layar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(1,4,15,0.55)_100%)]" />
    </div>
  )
}

export default PS2Background
