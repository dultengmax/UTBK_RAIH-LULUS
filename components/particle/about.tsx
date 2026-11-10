"use client"

import { motion } from "motion/react"
import { BarChart3, BookOpenCheck, Building2, GraduationCap, Shield, Target } from "lucide-react"

const tryoutTypes = [
  {
    id: "snbt",
    title: "SNBT / PTN",
    icon: GraduationCap,
    tagline: "UI, ITB, UGM, UNPAD & PTN top lainnya",
    features: ["Simulasi Full CBT", "Prediksi Passing Grade", "Ranking Nasional"],
  },
  {
    id: "stan",
    title: "PKN STAN",
    icon: Building2,
    tagline: "Sekolah Tinggi Akuntansi Negara",
    features: ["Tes Kemampuan Dasar", "Tes Bahasa Inggris", "Tes Potensi Akademik"],
  },
  {
    id: "cpns",
    title: "CPNS / BUMN",
    icon: Shield,
    tagline: "Formasi di seluruh Indonesia",
    features: ["TWK, TIU, TKP", "Simulasi CAT", "Bank Soal Lengkap"],
  },
]

const advantages = [
  {
    title: "Sistem CAT Realistik",
    description: "Antarmuka dan timer yang dibuat seolah-olah kamu mengerjakan ujian aslinya.",
    icon: BarChart3,
  },
  {
    title: "Pembahasan Lengkap",
    description: "Setiap soal dibahas step-by-step oleh tutor yang paham pola ujian terbaru.",
    icon: Target,
  },
  {
    title: "Analisis Performa",
    description: "Laporan kekuatan dan kelemahan per subtes agar belajar lebih terarah.",
    icon: BookOpenCheck,
  },
]

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a192f] py-24">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute left-1/4 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-blue-500/20 to-transparent lg:block" />
      <div className="absolute right-1/4 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-indigo-500/20 to-transparent lg:block" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400"
          >
            Satu Platform, Semua Seleksi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-4 mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            Latihan yang Benar-Benar{" "}
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text font-extrabold text-transparent">
              Terasa Seperti Ujian Asli.
            </span>
          </motion.h2>
          <p className="text-lg text-gray-400">
            Dari SNBT hingga CPNS, setiap tryout dibuat mengikuti alur, penilaian, dan suasana
            seleksi negeri yang sesungguhnya.
          </p>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tryoutTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className="group relative h-full"
            >
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                <div className="mb-8 flex items-start justify-between">
                  <div className="rounded-2xl border border-white/10 bg-linear-to-br from-blue-500/20 to-transparent p-4 transition-transform duration-500 group-hover:scale-110">
                    <type.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="text-4xl font-black text-white/5 transition-colors group-hover:text-blue-500/20">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                  {type.title}
                </h3>
                <p className="mb-6 text-sm text-gray-400">{type.tagline}</p>

                <ul className="mb-8 space-y-3 border-t border-white/10 pt-6">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="mt-auto w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300">
                  Mulai Tryout {type.title}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-3">
            {advantages.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="rounded-xl border border-white/10 bg-linear-to-br from-blue-500/20 to-transparent p-3">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Siap mulai dari <span className="text-blue-500">tryout pertamamu?</span>
          </h3>

          <a
            href="/register"
            className="inline-block rounded-2xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)]"
          >
            Mulai Sekarang Gratis
          </a>

          <p className="mt-4 text-sm text-gray-500">
            Gratis akses 3 tryout pertama untuk semua kategori
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
