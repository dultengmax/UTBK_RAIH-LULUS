"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { 
  Building2, 
  Shield, 
  GraduationCap, 
  Target, 
  Trophy, 
  Users, 
  BarChart3, 
  CheckCircle,
  Clock,
  Award
} from "lucide-react"

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const tryoutTypes = [
    {
      id: "snbt",
      title: "SNBT/PTN",
      icon: GraduationCap,
      color: "from-blue-600 to-cyan-500",
      bgColor: "bg-linear-to-br",
      stats: "50k+ Peserta",
      description: "UI, ITB, UGM, UNPAD & PTN Top Lainnya",
      features: ["Simulasi Full CBT", "Prediksi Passing Grade", "Ranking Nasional"]
    },
    {
      id: "stan",
      title: "PKN STAN",
      icon: Building2,
      color: "from-emerald-600 to-green-400",
      bgColor: "bg-linear-to-br",
      stats: "85% Lulus TKD",
      description: "Sekolah Tinggi Akuntansi Negara",
      features: ["Tes Kemampuan Dasar", "Tes Bahasa Inggris", "Tes Potensi Akademik"]
    },
    {
      id: "cpns",
      title: "CPNS/BUMN",
      icon: Shield,
      color: "from-amber-600 to-orange-500",
      bgColor: "bg-linear-to-br",
      stats: "1000+ Soal Update",
      description: "Formasi Seluruh Indonesia",
      features: ["TWK, TIU, TKP", "Simulasi CAT", "Bank Soal Lengkap"]
    }
  ]

  const achievementStats = [
    { value: "150k+", label: "Total Peserta", icon: Users, color: "text-blue-600" },
    { value: "98%", label: "Kepuasan Pengguna", icon: Trophy, color: "text-emerald-600" },
    { value: "24/7", label: "Akses Tryout", icon: Clock, color: "text-amber-600" },
    { value: "Top 10", label: "Ranking Nasional", icon: Award, color: "text-purple-600" },
  ]

  return (
    <section ref={ref} className="relative py-24 bg-linear-to-b from-white to-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-linear-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] bg-linear-to-br from-emerald-100 to-green-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-amber-100 to-orange-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Platform Tryout Terlengkap di Indonesia
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Siap Hadapi
            <span className="block bg-linear-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Ujian Nasional & Seleksi Negeri
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Dari <span className="font-semibold text-blue-600">SNBT</span> hingga <span className="font-semibold text-emerald-600">CPNS</span>, 
            kami menyediakan platform simulasi terintegrasi untuk semua jenjang seleksi negeri dengan sistem yang
            <span className="font-semibold text-amber-600"> 99% mirip ujian asli</span>.
          </p>
        </motion.div>

        {/* Tryout Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tryoutTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`h-full rounded-3xl p-8 bg-linear-to-br from-white to-slate-50 border border-slate-200`}>
                  {/* Icon & Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${type.bgColor} ${type.color} bg-opacity-10`}>
                      <type.icon className={`w-8 h-8 ${type.color.replace('from-', 'text-').replace(' to-', '')}`} />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      className="p-2 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                      <div className="flex items-center gap-2 text-lg font-semibold  bg-clip-text text-transparent bg-linear-to-r">
                        <span className={`${type.color.replace('from-', 'text-').replace(' to-', '')}`}>
                          {type.stats}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600">{type.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 pt-4">
                      {type.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 1 + (index * 0.3) + (idx * 0.1) }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className={`w-2 h-2 rounded-full ${type.color.replace('from-', 'bg-linear-to-r from-').replace(' to-', ' to-')}`} />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${type.bgColor} ${type.color} hover:shadow-lg`}
                    >
                      Mulai Tryout {type.title}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats & Achievement Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-linear-to-r from-slate-900 to-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-emerald-500 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Keunggulan Platform Kami
              </h3>
              <p className="text-slate-300 text-lg">
                Terbukti membantu ribuan peserta meraih kesuksesan dalam berbagai seleksi negeri
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievementStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-white/10 to-transparent mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-slate-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Sistem CAT Realistik",
                    description: "Simulasi Computer Assisted Test dengan timer dan antarmuka mirip ujian asli",
                    icon: BarChart3
                  },
                  {
                    title: "Pembahasan Lengkap",
                    description: "Video pembahasan step-by-step oleh tutor berpengalaman",
                    icon: Target
                  },
                  {
                    title: "Analisis Performa",
                    description: "Laporan detil kekuatan & kelemahan untuk fokus belajar",
                    icon: Trophy
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-emerald-500/20">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-slate-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 mb-8">
            {["SNBT", "PKN STAN", "CPNS", "BUMN", "PPPK", "TNI/POLRI"].map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.8 + index * 0.1 }}
                className="px-4 py-2 bg-linear-to-r from-blue-50 to-emerald-50 text-gray-700 rounded-full font-medium border border-blue-100"
              >
                {item}
              </motion.span>
            ))}
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Siap <span className="text-blue-600">#TaklukkanUjian</span> Bersama Kami?
          </h3>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-linear-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Mulai Sekarang Gratis
          </motion.button>
          
          <p className="text-gray-500 mt-4 text-sm">
            *Gratis akses 3 tryout pertama untuk semua kategori
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
