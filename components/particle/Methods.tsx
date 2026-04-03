"use client"

import { motion } from "motion/react"
import { Cpu, BarChart3, Target, Trophy, ChevronRight } from "lucide-react"

const MetodeSection = () => {
  const steps = [
    {
      title: "Real-time Simulation",
      desc: "Ujian dirancang dengan sistem CBT (Computer Based Test) yang menyerupai antarmuka asli UTBK-SNBT, lengkap dengan timer dan sistem navigasi soal.",
      icon: <Target className="w-8 h-8 text-blue-400" />,
      color: "from-blue-500/20 to-transparent",
    },
    {
      title: "Weight Analysis",
      desc: "Algoritma kami menganalisis setiap soal. Semakin sedikit peserta yang menjawab benar, semakin tinggi nilai bobot soal tersebut secara otomatis.",
      icon: <BarChart3 className="w-8 h-8 text-indigo-400" />,
      color: "from-indigo-500/20 to-transparent",
    },
    {
      title: "IRT Engine 2.0",
      desc: "Menggunakan pemodelan statistik Item Response Theory untuk memastikan skor kamu mencerminkan tingkat kemampuan kognitif yang sebenarnya.",
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500/20 to-transparent",
    },
    {
      title: "National Analytics",
      desc: "Setiap pukul 00:00, sistem melakukan re-kalkulasi massal untuk memberikan peringkat nasional dan peluang kelulusan di jurusan impian.",
      icon: <Trophy className="w-8 h-8 text-emerald-400" />,
      color: "from-emerald-500/20 to-transparent",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0a192f] py-24">
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
            The Science of Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-4 mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            Sistem Penilaian{" "}
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text font-extrabold text-transparent">
              Paling Akurat.
            </span>
          </motion.h2>
          <p className="text-lg text-gray-400">
            Kami tidak hanya menghitung benar dan salah. Kami menganalisis kualitas jawaban Anda
            dengan standar sistem seleksi nasional.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="group relative h-full"
            >
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                <div className="mb-8 flex items-start justify-between">
                  <div
                    className={`rounded-2xl border border-white/10 bg-linear-to-br ${step.color} p-4 transition-transform duration-500 group-hover:scale-110`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-white/5 transition-colors group-hover:text-blue-500/20">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mb-4 flex items-center text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">{step.desc}</p>

                {index < steps.length - 1 ? (
                  <div className="absolute top-1/2 -right-4 hidden translate-x-full text-white/10 lg:block">
                    <ChevronRight size={32} />
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 flex justify-center text-center"
        >
          <div className="flex items-center space-x-3 rounded-full border border-blue-500/20 bg-blue-500/5 px-6 py-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-gray-400">
              Sistem kami terintegrasi dengan database 100+ PTN se-Indonesia
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MetodeSection
