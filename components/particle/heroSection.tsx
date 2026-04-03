"use client"

import { useEffect } from "react"
import { motion, useAnimate, useReducedMotion } from "motion/react"
import RotatingText from "../RotatingText"

const floatingClouds = [
  {
    id: "cloud-left",
    className: "left-[-7%] top-[14%] w-72 opacity-55 md:w-80",
    driftX: 14,
    driftY: 8,
    duration: 28,
    delay: 0,
  },
  {
    id: "cloud-right",
    className: "right-[4%] top-[18%] hidden w-80 opacity-40 lg:block xl:w-[24rem]",
    driftX: -12,
    driftY: 7,
    duration: 32,
    delay: 1.2,
  },
  {
    id: "cloud-bottom",
    className: "bottom-[14%] left-[34%] hidden w-64 opacity-30 lg:block xl:w-72",
    driftX: 10,
    driftY: 6,
    duration: 26,
    delay: 0.6,
  },
] as const

function CloudShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" className={className} fill="none" aria-hidden="true">
      <path
        d="M96 142c-44 0-72-24-72-59 0-31 22-53 53-56 10-31 39-51 76-51 39 0 72 23 81 58 6-2 12-3 19-3 38 0 67 27 67 62 0 34-28 59-64 59H96Z"
        fill="rgba(255,255,255,0.14)"
      />
      <path
        d="M92 147c-37 0-60-21-60-50 0-25 18-43 44-45 8-24 31-41 61-41 34 0 58 18 65 47 6-2 11-3 18-3 32 0 55 21 55 49s-24 43-53 43H92Z"
        fill="rgba(191,219,254,0.2)"
      />
      <ellipse cx="114" cy="92" rx="44" ry="24" fill="rgba(255,255,255,0.26)" />
      <ellipse cx="182" cy="76" rx="38" ry="20" fill="rgba(255,255,255,0.18)" />
    </svg>
  )
}

const HeroSection = () => {
  const [scope, animate] = useAnimate()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const runAnimation = async () => {
      await Promise.all([
        animate(
          "[data-hero-badge]",
          { opacity: [0, 1], y: shouldReduceMotion ? [0, 0] : [12, 0] },
          { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.06 }
        ),
        animate(
          "[data-hero-left]",
          { opacity: [0.75, 1], x: shouldReduceMotion ? [0, 0] : [-16, 0] },
          { duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] }
        ),
        animate(
          "[data-hero-right]",
          {
            opacity: [0.76, 1],
            scale: shouldReduceMotion ? [1, 1] : [0.975, 1],
            y: shouldReduceMotion ? [0, 0] : [10, 0],
          },
          { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }
        ),
      ])
    }

    void runAnimation()
  }, [animate, shouldReduceMotion])

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[linear-gradient(112deg,#081426_0%,#0b1b34_52%,#182561_100%)] pt-24 lg:pt-28"
    >
      <div className="absolute left-[-5%] top-[-10%] h-[34%] w-[34%] rounded-full bg-blue-600/18 blur-[96px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[34%] w-[34%] rounded-full bg-indigo-600/18 blur-[96px]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white/[0.04] to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingClouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className={`absolute transform-gpu will-change-transform ${cloud.className}`}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, cloud.driftX, cloud.driftX * -0.35, 0],
                    y: [0, -cloud.driftY, cloud.driftY * 0.35, 0],
                  }
            }
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: cloud.delay,
            }}
          >
            <CloudShape className="h-auto w-full drop-shadow-[0_16px_34px_rgba(125,211,252,0.08)]" />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto grid items-center gap-14 px-6 lg:min-h-[42rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
        <motion.div data-hero-left className="pb-2 lg:pb-10">
          <motion.div
            data-hero-badge
            className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-400">
              Tryout SNBT 2026 Terbaru
            </span>
          </motion.div>

<RotatingText
  texts={['Lolos PTN Impian', 'Lolos di kedinasan', 'Lolos seleksi BUMN']}
  mainClassName="px-2 sm:px-2 md:px-3  text-white overflow-hidden py-0.5 sm:py-1  text-5xl lg:text-7xl font-bold"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={6000}
/>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-gray-400">
          <h1 className="mb-6 text-5xl font-bold leading-[1.1] text-white lg:text-7xl">
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Mulai Dari Sini.
            </span>
          </h1>
            Simulasi ujian dengan sistem penilaian IRT yang akurat, pembahasan mendalam, dan
            pemetaan peluang masuk jurusan favoritmu secara real-time.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500"
            >
              Mulai Tryout Gratis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Lihat Ranking
            </motion.button>
          </div>

          <div className="mt-10 flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#0a192f] bg-gray-600"
                >
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-white">12,000+</span> Siswa telah bergabung minggu ini
            </p>
          </div>
        </motion.div>

        <motion.div
          data-hero-right
          className="relative hidden min-h-[42rem] transform-gpu lg:flex lg:items-end lg:justify-end"
        >
          <div className="pointer-events-none absolute inset-x-12 bottom-2 h-20 rounded-full bg-blue-500/10 blur-2xl" />

          <div className="relative z-20 ml-auto flex h-[38rem] w-full max-w-[62rem] items-end justify-center overflow-hidden  bg-linear-to-b from-transparent to-white/[0.01] shadow-[0_34px_100px_rgba(2,8,23,0.42)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:150px_100%] opacity-20" />
            <div className="absolute inset-x-0 bottom-0 z-10 h-44 bg-linear-to-t from-[#0a192f] via-[#0a192f]/58 to-transparent" />
            <img
              src="https://media.canva.com/v2/image-resize/format:PNG/height:893/quality:100/uri:ifs%3A%2F%2FM%2F27a9e123-5bc8-48e0-90b0-9fd1543532df/watermark:F/width:1600?csig=AAAAAAAAAAAAAAAAAAAAANGuFNW_BdEOwPdV8pa-rKVyCXKHRcOjuCGR3I0Ys_aE&exp=1775222798&osig=AAAAAAAAAAAAAAAAAAAAAB69OVhixPZK02Y7SA9ns5yoPTO1W8xy8Apert2T5NyA&signer=media-rpc&x-canva-quality=screen_2x"
              alt="Students Studying"
              className="relative z-0 h-[118%] w-auto max-w-none object-contain object-bottom opacity-[0.96]"
            />
          </div>

          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-10 z-30 rounded-2xl border border-white/18 bg-white/10 p-4 shadow-xl backdrop-blur-sm will-change-transform"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-green-500/20 p-2">
                <div className="h-6 w-6 rounded-full bg-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Skor IRT Kamu</p>
                <p className="text-xl font-bold text-white">748.50</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-6 left-0 z-30 rounded-2xl border border-white/18 bg-white/10 p-5 shadow-xl backdrop-blur-sm will-change-transform lg:-left-6"
          >
            <p className="mb-1 text-xs text-gray-300">Ranking Nasional</p>
            <p className="text-2xl font-bold text-blue-400">
              #12 <span className="text-sm font-normal text-gray-400">/ 50k</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
