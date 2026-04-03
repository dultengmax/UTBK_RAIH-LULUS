"use client"

import { motion } from "motion/react"
import { formatRupiah, PAYMENT_MERCHANT } from "@/constants/paymentDummy"
import { type PaymentData } from "@/types/payment"

type OrderSummaryProps = {
  payment: PaymentData
}

export default function OrderSummary({ payment }: OrderSummaryProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-xl border border-sky-200 bg-white p-5 md:p-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.06 }}
        className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-500"
      >
        Rincian Pesanan
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.27, delay: 0.1 }}
        className="mt-4 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2.5"
      >
        <p className="text-[11px] text-sky-300">No. Pesanan</p>
        <p className="mt-0.5 text-[13px] font-semibold tracking-[0.01em] text-sky-900">
          {payment.orderId}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.12,
            },
          },
        }}
        className="mt-4 space-y-3"
      >
        {payment.items.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: "easeOut" } },
            }}
            whileHover={{ x: 2 }}
            className="flex items-start justify-between gap-3"
          >
            <div>
              <p className="text-[13px] font-bold text-sky-900">{item.name}</p>
              <p className="text-[11px] text-sky-300">{item.description}</p>
            </div>
            <p className="text-[13px] font-semibold text-sky-900">{formatRupiah(item.price)}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="my-4 h-px w-full bg-sky-100" />

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px] text-sky-400">
          <p>Subtotal</p>
          <p>{formatRupiah(payment.subtotal)}</p>
        </div>
        <div className="flex items-center justify-between text-[12px] text-sky-400">
          <p>Diskon</p>
          <p className="font-medium text-green-600">- {formatRupiah(payment.discount)}</p>
        </div>
        <div className="flex items-center justify-between text-[12px] text-sky-400">
          <p>Biaya layanan</p>
          <p>{formatRupiah(payment.serviceFee)}</p>
        </div>
      </div>

      <motion.div
        className="mt-4 rounded-xl bg-sky-50 px-3.5 py-3"
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[13px] font-semibold text-sky-700">Total bayar</p>
        <p className="mt-1 text-[18px] font-bold tracking-tight text-sky-600">
          {formatRupiah(payment.total)}
        </p>
      </motion.div>

      <div className="my-4 h-px w-full bg-sky-100" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-[13px] font-bold text-sky-600"
          animate={{ rotate: [0, 4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {PAYMENT_MERCHANT.initials}
        </motion.div>
        <div>
          <p className="text-[13px] font-bold text-sky-900">{payment.merchantName}</p>
          <p className="text-[11px] text-sky-300">{payment.merchantId}</p>
        </div>
      </motion.div>
    </motion.aside>
  )
}
