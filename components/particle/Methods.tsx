"use client"
import { motion } from "motion/react";
import { Cpu, BarChart3, Target, Trophy, ChevronRight } from "lucide-react";

const MetodeSection = () => {
  const steps = [
    { 
      title: "Real-time Simulation", 
      desc: "Ujian dirancang dengan sistem CBT (Computer Based Test) yang menyerupai antarmuka asli UTBK-SNBT, lengkap dengan timer dan sistem navigasi soal.",
      icon: <Target className="w-8 h-8 text-blue-400" />,
      color: "from-blue-500/20 to-transparent"
    },
    { 
      title: "Weight Analysis", 
      desc: "Algoritma kami menganalisis setiap soal. Semakin sedikit peserta yang menjawab benar, semakin tinggi nilai bobot soal tersebut secara otomatis.",
      icon: <BarChart3 className="w-8 h-8 text-indigo-400" />,
      color: "from-indigo-500/20 to-transparent"
    },
    { 
      title: "IRT Engine 2.0", 
      desc: "Menggunakan pemodelan statistik Item Response Theory untuk memastikan skor kamu mencerminkan tingkat kemampuan kognitif yang sebenarnya.",
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500/20 to-transparent"
    },
    { 
      title: "National Analytics", 
      desc: "Setiap pukul 00:00, sistem melakukan re-kalkulasi massal untuk memberikan peringkat nasional dan peluang kelulusan di jurusan impian.",
      icon: <Trophy className="w-8 h-8 text-emerald-400" />,
      color: "from-emerald-500/20 to-transparent"
    },
  ];

  return (
    <section className="py-24 bg-[#0a192f] relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-blue-500/20 to-transparent hidden lg:block" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-indigo-500/20 to-transparent hidden lg:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-blue-400 font-semibold tracking-[0.2em] uppercase text-sm"
          >
            The Science of Success
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
          >
            Sistem Penilaian <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400 font-extrabold">Paling Akurat.</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Kami tidak hanya menghitung benar dan salah. Kami menganalisis kualitas jawaban Anda dengan standar sistem seleksi nasional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative group h-full"
            >
              {/* Card Container */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl h-full backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                
                {/* Icon & Index */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl bg-linear-to-br ${step.color} border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-white/5 group-hover:text-blue-500/20 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>

                {/* Progress Line for Desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 translate-x-full hidden lg:block text-white/10">
                    <ChevronRight size={32} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Methodology */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 flex justify-center text-center"
        >
          <div className="px-6 py-3 rounded-full bg-blue-500/5 border border-blue-500/20 flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-gray-400 text-sm">Sistem kami terintegrasi dengan database 100+ PTN se-Indonesia</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetodeSection;
