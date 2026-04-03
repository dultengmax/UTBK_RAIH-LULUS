"use client"
import { useEffect } from "react"
import { motion, useAnimate } from "motion/react"
const HeroSection = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const runAnimation = async () => {
      await Promise.all([
        animate(
          "[data-hero-badge]",
          { opacity: [0, 1], y: [16, 0] },
          { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.08 }
        ),
        animate(
          "[data-hero-left]",
          { opacity: [0.68, 1], x: [-24, 0] },
          { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        ),
        animate(
          "[data-hero-right]",
          { opacity: [0.7, 1], scale: [0.95, 1] },
          { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }
        ),
      ])
    }

    runAnimation()
  }, [animate])

  return (
    <section ref={scope} className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden bg-[#0a192f]">
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: CONTENT */}
        <motion.div 
          data-hero-left
        >
          <motion.div 
            data-hero-badge
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">Tryout SNBT 2026 Terbaru</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Lolos PTN Impian <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Mulai Dari Sini.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
            Simulasi ujian dengan sistem penilaian IRT yang akurat, pembahasan mendalam, dan pemetaan peluang masuk jurusan favoritmu secara real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
            >
              Mulai Tryout Gratis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-xl backdrop-blur-sm transition-all"
            >
              Lihat Ranking
            </motion.button>
          </div>

          <div className="mt-10 flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a192f] bg-gray-600 overflow-hidden">
                   <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="text-white font-bold">12,000+</span> Siswa telah bergabung minggu ini
            </p>
          </div>
        </motion.div>

        {/* RIGHT SIDE: IMAGE & ANIMATION */}
        <motion.div 
          data-hero-right
          className="relative lg:block hidden"
        >
          {/* Main Image Container */}
          <div className="relative z-20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523240715630-974bb1ad1932?q=80&w=2070&auto=format&fit=crop" 
              alt="Students Studying"
              className="w-full h-auto object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a192f] via-transparent to-transparent" />
          </div>

          {/* Floating Card 1: IRT Score */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 z-30 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                 <div className="w-6 h-6 bg-green-500 rounded-full" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Skor IRT Kamu</p>
                <p className="text-xl font-bold text-white">748.50</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2: Ranking */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 z-30 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl"
          >
             <p className="text-xs text-gray-300 mb-1">Ranking Nasional</p>
             <p className="text-2xl font-bold text-blue-400">#12 <span className="text-sm font-normal text-gray-400">/ 50k</span></p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
