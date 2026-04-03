"use client"
import { motion } from "motion/react"
import { Quote, Star } from "lucide-react"; // npm install lucide-react

const TestimonySection = () => {
  const reviews = [
    { 
      name: "Andini Putri", 
      univ: "Diterima di Pendidikan Dokter UI", 
      text: "Sistem penilaian IRT di sini sangat akurat. Saya jadi bisa mengukur kemampuan asli saya dibanding kompetitor nasional. Soal-soalnya pun sangat update dengan kisi-kisi terbaru!",
      img: "https://i.pravatar.cc/150?u=andini"
    },
    { 
      name: "Budi Setiadi", 
      univ: "Diterima di STEI ITB", 
      text: "Fitur pembahasan videonya juara sih. Gampang banget dimengerti buat materi yang biasanya susah. Hasil tryout keluar cepat dan rankingnya real-time!",
      img: "https://i.pravatar.cc/150?u=budi"
    },
    { 
      name: "Rizky Ramadhan", 
      univ: "Diterima di Hukum Unpad", 
      text: "Udah coba berbagai platform, tapi cuma di sini yang simulasi ujiannya kerasa banget pressure-nya mirip UTBK asli. Sangat membantu melatih mental!",
      img: "https://i.pravatar.cc/150?u=rizky"
    }
  ];

  return (
    <section className="py-24 bg-[#0a192f] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-blue-400 font-semibold tracking-widest uppercase text-sm"
          >
            Testimoni Alumni
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mt-4"
          >
            Kisah Sukses Pejuang <span className="text-blue-500">PTN Impian</span>
          </motion.h2>
        </div>

        {/* Grid Testimoni */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote size={48} className="text-blue-400" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mb-8 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30">
                  <img src={rev.img} alt={rev.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{rev.name}</h4>
                  <p className="text-blue-400 text-xs font-medium">{rev.univ}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Background Element */}
        <div className="mt-20 text-center">
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-gray-500 text-sm"
            >
                Bergabunglah dengan 50,000+ siswa lainnya sekarang.
            </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TestimonySection;
