"use client"

import { motion } from "motion/react"
import { ShieldCheck, Timer } from "lucide-react"

import OrderSummary from "@/components/payment/OrderSummary"
import QrisPayment from "@/components/payment/QrisPayment"
import { BRAND } from "@/lib/brand"
import { type PaymentData } from "@/types/payment"

type PaymentLayoutProps = {
  payment: PaymentData
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function PaymentLayout({ payment }: PaymentLayoutProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start xl:grid-cols-[minmax(0,392px)_minmax(0,1fr)] xl:gap-6"
    >
      <motion.div
        variants={item}
        className="order-2 space-y-4 lg:order-1 lg:sticky lg:top-24"
      >
        <OrderSummary payment={payment} />

        <aside className="hidden rounded-2xl border border-sky-100 bg-white/70 p-5 lg:block">
          <h2 className="text-sm font-semibold text-slate-900">Butuh bantuan?</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Jika pembayaran tidak terverifikasi otomatis, hubungi tim kami dengan menyertakan nomor
            pesanan di atas.
          </p>
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="mt-3 inline-flex text-xs font-semibold text-sky-600 hover:underline"
          >
            {BRAND.supportEmail}
          </a>

          <ul className="mt-4 space-y-2.5 border-t border-sky-100 pt-4 text-[11px] text-slate-500">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-sky-500" />
              Enkripsi standar perbankan
            </li>
            <li className="flex items-center gap-2">
              <Timer className="h-4 w-4 shrink-0 text-sky-500" />
              Verifikasi otomatis setelah pembayaran
            </li>
          </ul>
        </aside>
      </motion.div>

      <motion.div variants={item} className="order-1 lg:order-2">
        <QrisPayment payment={payment} />
      </motion.div>
    </motion.div>
  )
}
