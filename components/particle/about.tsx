"use client"

import { motion } from "motion/react"
import {
  Award,
  BarChart3,
  Building2,
  CheckCircle,
  Clock,
  GraduationCap,
  Shield,
  Target,
  Trophy,
  Users,
} from "lucide-react"

const AboutSection = () => {
  const tryoutTypes = [
    {
      id: "snbt",
      title: "SNBT/PTN",
      icon: GraduationCap,
      color: "from-blue-600 to-cyan-500",
      bgColor: "bg-linear-to-br",
      stats: "50k+ Peserta",
      description: "UI, ITB, UGM, UNPAD & PTN Top Lainnya",
      features: ["Simulasi Full CBT", "Prediksi Passing Grade", "Ranking Nasional"],
    },
    {
      id: "stan",
      title: "PKN STAN",
      icon: Building2,
      color: "from-emerald-600 to-green-400",
      bgColor: "bg-linear-to-br",
      stats: "85% Lulus TKD",
      description: "Sekolah Tinggi Akuntansi Negara",
      features: ["Tes Kemampuan Dasar", "Tes Bahasa Inggris", "Tes Potensi Akademik"],
    },
    {
      id: "cpns",
      title: "CPNS/BUMN",
      icon: Shield,
      color: "from-amber-600 to-orange-500",
      bgColor: "bg-linear-to-br",
      stats: "1000+ Soal Update",
      description: "Formasi Seluruh Indonesia",
      features: ["TWK, TIU, TKP", "Simulasi CAT", "Bank Soal Lengkap"],
    },
  ]

  const achievementStats = [
    { value: "150k+", label: "Total Peserta", icon: Users, color: "text-blue-600" },
    { value: "98%", label: "Kepuasan Pengguna", icon: Trophy, color: "text-emerald-600" },
    { value: "24/7", label: "Akses Tryout", icon: Clock, color: "text-amber-600" },
    { value: "Top 10", label: "Ranking Nasional", icon: Award, color: "text-purple-600" },
  ]

  const tagContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const tagItem = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 },
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-slate-50 py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -right-60 h-[800px] w-[800px] rounded-full bg-linear-to-br from-blue-100 to-cyan-100 opacity-40 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 h-[800px] w-[800px] rounded-full bg-linear-to-br from-emerald-100 to-green-100 opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-amber-100 to-orange-100 opacity-20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Platform Tryout Terlengkap di Indonesia
          </div>

          <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Siap Hadapi
            <span className="block bg-linear-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Ujian Nasional & Seleksi Negeri
            </span>
          </h2>

          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            Dari <span className="font-semibold text-blue-600">SNBT</span> hingga{" "}
            <span className="font-semibold text-emerald-600">CPNS</span>, kami menyediakan
            platform simulasi terintegrasi untuk semua jenjang seleksi negeri dengan sistem yang
            <span className="font-semibold text-amber-600"> 99% mirip ujian asli</span>.
          </p>
        </motion.div>

        <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tryoutTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.16 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full rounded-3xl bg-white p-1 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="h-full rounded-3xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className={`rounded-2xl p-4 ${type.bgColor} ${type.color} bg-opacity-10`}>
                      <type.icon
                        className={`w-8 h-8 ${type.color.replace("from-", "text-").replace(" to-", "")}`}
                      />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      className="rounded-full bg-slate-100 p-2 transition-colors group-hover:bg-blue-50"
                    >
                      <CheckCircle className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">{type.title}</h3>
                      <div className="flex items-center gap-2 bg-linear-to-r bg-clip-text text-lg font-semibold text-transparent">
                        <span
                          className={type.color.replace("from-", "text-").replace(" to-", "")}
                        >
                          {type.stats}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600">{type.description}</p>

                    <ul className="space-y-3 pt-4">
                      {type.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: 0.35 + index * 0.15 + featureIndex * 0.08 }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${type.color.replace("from-", "bg-linear-to-r from-").replace(" to-", " to-")}`}
                          />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-6 w-full rounded-xl py-3 font-semibold text-white transition-all duration-300 ${type.bgColor} ${type.color} hover:shadow-lg`}
                    >
                      Mulai Tryout {type.title}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 to-gray-900 p-8 md:p-12"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-linear-to-br from-blue-500 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-linear-to-tr from-emerald-500 to-transparent blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Keunggulan Platform Kami
              </h3>
              <p className="text-lg text-slate-300">
                Terbukti membantu ribuan peserta meraih kesuksesan dalam berbagai seleksi negeri
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {achievementStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-white/10 to-transparent">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`mb-2 text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="font-medium text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 border-t border-white/10 pt-8"
            >
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Sistem CAT Realistik",
                    description:
                      "Simulasi Computer Assisted Test dengan timer dan antarmuka mirip ujian asli",
                    icon: BarChart3,
                  },
                  {
                    title: "Pembahasan Lengkap",
                    description: "Video pembahasan step-by-step oleh tutor berpengalaman",
                    icon: Target,
                  },
                  {
                    title: "Analisis Performa",
                    description: "Laporan detil kekuatan & kelemahan untuk fokus belajar",
                    icon: Trophy,
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="rounded-xl bg-linear-to-br from-blue-500/20 to-emerald-500/20 p-3">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 text-center"
        >
          <motion.div
            variants={tagContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8 inline-flex flex-wrap items-center justify-center gap-4"
          >
            {["SNBT", "PKN STAN", "CPNS", "BUMN", "PPPK", "TNI/POLRI"].map((item) => (
              <motion.span
                key={item}
                variants={tagItem}
                className="rounded-full border border-blue-100 bg-linear-to-r from-blue-50 to-emerald-50 px-4 py-2 font-medium text-gray-700"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>

          <h3 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Siap <span className="text-blue-600">#TaklukkanUjian</span> Bersama Kami?
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-linear-to-r from-blue-600 to-emerald-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Mulai Sekarang Gratis
          </motion.button>

          <p className="mt-4 text-sm text-gray-500">
            *Gratis akses 3 tryout pertama untuk semua kategori
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
