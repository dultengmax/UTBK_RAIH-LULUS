"use client"

import { motion } from "motion/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Apa itu sistem penilaian IRT?",
    answer:
      "IRT (Item Response Theory) adalah sistem penilaian di mana bobot skor setiap soal ditentukan oleh tingkat kesulitannya. Semakin sedikit peserta yang menjawab benar sebuah soal, semakin tinggi poin yang didapatkan dari soal tersebut.",
  },
  {
    question: "Kapan skor tryout saya keluar?",
    answer:
      "Skor mentah akan muncul segera setelah ujian selesai, namun skor final berbasis IRT dan ranking nasional akan diperbarui secara otomatis setiap pukul 00:00 WIB setelah data seluruh peserta terkumpul.",
  },
  {
    question: "Apakah soal-soal di sini sesuai dengan kisi-kisi terbaru?",
    answer:
      "Ya, tim konten kami selalu memperbarui bank soal mengikuti tren subtes terbaru seperti Literasi Bahasa Indonesia, Bahasa Inggris, dan Penalaran Matematika sesuai standar SNPMB.",
  },
  {
    question: "Bagaimana cara berlangganan paket premium?",
    answer:
      "Kamu bisa masuk ke menu 'Pricing', pilih paket yang diinginkan, dan lakukan pembayaran melalui e-wallet (Dana, OVO, QRIS) atau transfer bank. Akses akan terbuka otomatis seketika.",
  },
]

const FAQSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a192f] py-24">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-16 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
              <HelpCircle size={16} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Support</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
              Punya Pertanyaan <br />
              <span className="text-blue-500">Mengenai Tryout?</span>
            </h2>
            <p className="mb-8 text-gray-400">
              Kami merangkum pertanyaan yang paling sering diajukan untuk membantu kamu memahami
              sistem kami lebih cepat.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="mb-2 font-medium text-white">Belum menemukan jawaban?</p>
              <p className="mb-4 text-sm text-gray-500">Tim support kami siap membantu 24/7.</p>
              <button className="flex items-center font-bold text-blue-400 transition-colors hover:text-blue-300">
                Hubungi Admin Kami -
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 shadow-sm transition-all hover:bg-white/10 data-[state=open]:border-blue-500/50 data-[state=open]:bg-blue-500/5"
                >
                  <AccordionTrigger className="py-6 text-left font-semibold text-white transition-colors hover:text-blue-400 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 leading-relaxed text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
