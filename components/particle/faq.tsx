"use client"
import { motion } from "motion/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Apa itu sistem penilaian IRT?",
    answer: "IRT (Item Response Theory) adalah sistem penilaian di mana bobot skor setiap soal ditentukan oleh tingkat kesulitannya. Semakin sedikit peserta yang menjawab benar sebuah soal, semakin tinggi poin yang didapatkan dari soal tersebut."
  },
  {
    question: "Kapan skor tryout saya keluar?",
    answer: "Skor mentah akan muncul segera setelah ujian selesai, namun skor final berbasis IRT dan ranking nasional akan diperbarui secara otomatis setiap pukul 00:00 WIB setelah data seluruh peserta terkumpul."
  },
  {
    question: "Apakah soal-soal di sini sesuai dengan kisi-kisi terbaru?",
    answer: "Ya, tim konten kami selalu memperbarui bank soal mengikuti tren subtes terbaru seperti Literasi Bahasa Indonesia, Bahasa Inggris, dan Penalaran Matematika sesuai standar SNPMB."
  },
  {
    question: "Bagaimana cara berlangganan paket premium?",
    answer: "Kamu bisa masuk ke menu 'Pricing', pilih paket yang diinginkan, dan lakukan pembayaran melalui e-wallet (Dana, OVO, QRIS) atau transfer bank. Akses akan terbuka otomatis seketika."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-[#0a192f] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sisi Kiri: Header */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
              <HelpCircle size={16} className="text-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Support</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Punya Pertanyaan <br /> 
              <span className="text-blue-500">Mengenai Tryout?</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Kami merangkum pertanyaan yang paling sering diajukan untuk membantu kamu memahami sistem kami lebih cepat.
            </p>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-white font-medium mb-2">Belum menemukan jawaban?</p>
              <p className="text-sm text-gray-500 mb-4">Tim support kami siap membantu 24/7.</p>
              <button className="text-blue-400 font-bold flex items-center hover:text-blue-300 transition-colors">
                Hubungi Admin Kami →
              </button>
            </div>
          </motion.div>

          {/* Sisi Kanan: Accordion FAQ */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/10 bg-white/5 rounded-2xl px-6 transition-all hover:bg-white/10 data-[state=open]:border-blue-500/50 data-[state=open]:bg-blue-500/5 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-white font-semibold py-6 hover:no-underline hover:text-blue-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
