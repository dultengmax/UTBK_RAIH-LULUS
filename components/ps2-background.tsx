"use client"

import { useMemo, type CSSProperties } from "react"

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

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "")
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function makeParticles(count: number, offset: number, colors: readonly string[]): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const r = (n: number) => seeded(index * 7.13 + n + offset)
    return {
      id: index,
      left: `${(r(1) * 100).toFixed(2)}%`,
      top: `${(r(2) * 100).toFixed(2)}%`,
      size: 4 + Math.round(r(3) * 5),
      duration: 11 + r(4) * 16,
      delay: r(5) * 20,
      driftX: (r(6) - 0.5) * 90,
      driftY: (r(7) - 0.5) * 90,
      color: colors[index % colors.length],
    }
  })
}

/**
 * Partikel cahaya melayang ala boot screen PlayStation 2.
 * Dianimasikan murni lewat CSS (kelas `ps2-particle` di globals.css) sehingga
 * berjalan di compositor/GPU thread, bukan JS per-frame.
 *
 * - variant "night": titik terang bercahaya untuk area gelap
 * - variant "light": titik indigo lembut untuk area putih/terang
 */
export function PS2Particles({
  variant = "night",
  count = 22,
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

  const peak = variant === "light" ? 0.5 : 0.85
  const min = variant === "light" ? 0.06 : 0.12

  return (
    <>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="ps2-particle"
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${hexToRgba(particle.color, 0.95)} 0%, ${hexToRgba(
                particle.color,
                0.45,
              )} 45%, transparent 72%)`,
              "--ps2-x": `${particle.driftX.toFixed(1)}px`,
              "--ps2-y": `${particle.driftY.toFixed(1)}px`,
              "--ps2-peak": `${peak}`,
              "--ps2-min": `${min}`,
              animationDuration: `${particle.duration.toFixed(1)}s`,
              animationDelay: `-${particle.delay.toFixed(1)}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  )
}

/**
 * Background animasi bergaya boot screen PlayStation 2:
 * langit biru pekat, orb cahaya melayang, pita cahaya bergerak,
 * partikel berkilau, plus scanline CRT halus.
 * Semua animasi CSS-only agar tetap ringan.
 */
export function PS2Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Langit deep-space biru khas boot PS2 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b2148_0%,#051233_42%,#01040f_100%)]" />

      {/* Orb nebula yang drift pelan (CSS, bukan JS) */}
      <div
        className="ps2-orb -left-40 top-[-15%] size-[34rem] bg-blue-500/20 blur-[90px]"
        style={{ "--ps2-x": "60px", "--ps2-y": "-40px", animationDuration: "18s" } as CSSProperties}
      />
      <div
        className="ps2-orb -right-48 bottom-[-20%] size-[38rem] bg-indigo-500/20 blur-[100px]"
        style={{ "--ps2-x": "-50px", "--ps2-y": "35px", animationDuration: "22s", animationDelay: "-6s" } as CSSProperties}
      />
      <div
        className="ps2-orb left-[36%] top-[32%] size-[26rem] bg-violet-500/15 blur-[80px]"
        style={{ "--ps2-x": "40px", "--ps2-y": "30px", animationDuration: "14s", animationDelay: "-3s" } as CSSProperties}
      />

      {/* Pita cahaya (light ribbon) ala streak boot PS2 */}
      <div
        className="ps2-ribbon -left-1/4 top-[36%] h-44 w-[150%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),rgba(37,99,235,0.12)_45%,transparent_70%)] blur-2xl"
        style={{ "--ps2-rot": "-6deg", "--ps2-x": "70px", animationDuration: "16s" } as CSSProperties}
      />
      <div
        className="ps2-ribbon -left-1/3 bottom-[10%] h-36 w-[160%] bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.24),rgba(139,92,246,0.1)_45%,transparent_70%)] blur-2xl"
        style={{ "--ps2-rot": "4deg", "--ps2-x": "-80px", animationDuration: "19s", animationDelay: "-6s" } as CSSProperties}
      />

      {/* Partikel cahaya melayang seperti "dust" boot PS2 */}
      <PS2Particles variant="night" count={30} />

      {/* Scanline CRT halus era PS2 */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(148,197,255,0.05)_0px,rgba(148,197,255,0.05)_1px,transparent_1px,transparent_3px)]" />

      {/* Vignette gelap di tepi layar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(1,4,15,0.55)_100%)]" />
    </div>
  )
}

export default PS2Background
