"use client"

import { motion } from "motion/react"
import { Quote, Star } from "lucide-react"

const TestimonySection = () => {
  const reviews = [
    {
      name: "Andini Putri",
      univ: "Diterima di Pendidikan Dokter UI",
      text: "Sistem penilaian IRT di sini sangat akurat. Saya jadi bisa mengukur kemampuan asli saya dibanding kompetitor nasional. Soal-soalnya pun sangat update dengan kisi-kisi terbaru!",
      img: "https://i.pravatar.cc/150?u=andini",
    },
    {
      name: "Budi Setiadi",
      univ: "Diterima di STEI ITB",
      text: "Fitur pembahasan videonya juara sih. Gampang banget dimengerti buat materi yang biasanya susah. Hasil tryout keluar cepat dan rankingnya real-time!",
      img: "https://i.pravatar.cc/150?u=budi",
    },
    {
      name: "Rizky Ramadhan",
      univ: "Diterima di Hukum Unpad",
      text: "Udah coba berbagai platform, tapi cuma di sini yang simulasi ujiannya kerasa banget pressure-nya mirip UTBK asli. Sangat membantu melatih mental!",
      img: "https://i.pravatar.cc/150?u=rizky",
    },
  ]

  return (
    <section className="overflow-hidden bg-[#0a192f] py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm font-semibold uppercase tracking-widest text-blue-400"
          >
            Testimoni Alumni
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-4 text-4xl font-bold text-white md:text-5xl"
          >
            Kisah Sukses Pejuang <span className="text-blue-500">PTN Impian</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="absolute top-6 right-8 opacity-10">
                <Quote size={48} className="text-blue-400" />
              </div>

              <div>
                <div className="mb-6 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="mb-8 leading-relaxed text-gray-300 italic">"{rev.text}"</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-blue-500/30">
                  <img src={rev.img} alt={rev.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{rev.name}</h4>
                  <p className="text-xs font-medium text-blue-400">{rev.univ}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm text-gray-500"
          >
            Bergabunglah dengan 50,000+ siswa lainnya sekarang.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default TestimonySection
