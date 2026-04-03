"use client"

import { motion } from "motion/react"
import OrderSummary from "@/components/payment/OrderSummary"
import QrisPayment from "@/components/payment/QrisPayment"
import { type PaymentData } from "@/types/payment"

type PaymentLayoutProps = {
  payment: PaymentData
}

export default function PaymentLayout({ payment }: PaymentLayoutProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.04,
          },
        },
      }}
      className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.6fr] md:gap-5"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        }}
      >
        <OrderSummary payment={payment} />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" } },
        }}
      >
        <QrisPayment payment={payment} />
      </motion.div>
    </motion.div>
  )
}
