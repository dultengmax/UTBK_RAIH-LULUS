"use client"

import { useMemo } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import PaymentLayout from "@/components/payment/PaymentLayout"
import { createPaymentData, PAYMENT_FALLBACK_ORDER_ID } from "@/constants/paymentDummy"

export default function PaymentPage() {
  const params = useParams<{ orderId: string }>()
  const searchParams = useSearchParams()

  const resolvedOrderId =
    typeof params.orderId === "string"
      ? params.orderId
      : Array.isArray(params.orderId)
        ? params.orderId[0]
        : undefined

  const orderId = resolvedOrderId ?? PAYMENT_FALLBACK_ORDER_ID
  const program = searchParams.get("program") ?? undefined

  const payment = useMemo(() => createPaymentData(orderId, program), [orderId, program])

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mb-4 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <motion.span
              aria-hidden="true"
              className="h-6 w-1 rounded-full bg-sky-500"
              animate={{ scaleY: [0.95, 1, 0.95] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-500">
              Pembayaran
            </p>
          </div>
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.985 }}>
            <Link
              href="/pricing"
              className="rounded-lg border border-sky-200 px-3 py-1.5 text-[12px] font-medium text-sky-600 transition-colors hover:bg-sky-100"
            >
              Kembali ke Paket
            </Link>
          </motion.div>
        </motion.div>

        <PaymentLayout payment={payment} />
      </div>
    </main>
  )
}
