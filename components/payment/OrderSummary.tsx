"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy, ReceiptText } from "lucide-react"

import { formatRupiah, PAYMENT_MERCHANT } from "@/constants/paymentDummy"
import { cn } from "@/lib/utils"
import { type PaymentData } from "@/types/payment"

type OrderSummaryProps = {
  payment: PaymentData
}

export default function OrderSummary({ payment }: OrderSummaryProps) {
  const [copied, setCopied] = useState(false)

  const deadline = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(payment.expiresAt)

  const costs = [
    { label: "Subtotal", value: formatRupiah(payment.subtotal), accent: false },
    { label: "Diskon", value: `- ${formatRupiah(payment.discount)}`, accent: true },
    { label: "Biaya layanan", value: formatRupiah(payment.serviceFee), accent: false },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payment.orderId)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Rincian pesanan"
      className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-28px_rgba(2,64,110,0.45)]"
    >
      <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Rincian pesanan</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            {payment.items.length} item · pembayaran QRIS
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
          <ReceiptText size={17} />
        </span>
      </div>

      <div className="space-y-4 px-5 pb-5">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-2.5 ring-1 ring-slate-100">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              No. pesanan
            </p>
            <p className="mt-0.5 truncate font-mono text-[13px] font-medium text-slate-800">
              {payment.orderId}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Nomor pesanan tersalin" : "Salin nomor pesanan"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        <ul className="space-y-3">
          {payment.items.map((orderItem, index) => (
            <motion.li
              key={orderItem.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.08 + index * 0.04 }}
              className="flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-snug text-slate-800">
                  {orderItem.name}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                  {orderItem.description}
                </p>
              </div>
              <p className="shrink-0 text-[13px] font-semibold tabular-nums text-slate-800">
                {formatRupiah(orderItem.price)}
              </p>
            </motion.li>
          ))}
        </ul>

        <dl className="space-y-2 border-t border-dashed border-slate-200 pt-4">
          {costs.map((cost) => (
            <div key={cost.label} className="flex items-center justify-between gap-3 text-xs">
              <dt className="text-slate-500">{cost.label}</dt>
              <dd
                className={cn(
                  "font-medium tabular-nums",
                  cost.accent ? "text-emerald-600" : "text-slate-700",
                )}
              >
                {cost.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-end justify-between gap-3 bg-sky-950 px-5 py-4 text-white">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
            Total bayar
          </p>
          <p className="mt-1 text-xl font-semibold leading-none tabular-nums">
            {formatRupiah(payment.total)}
          </p>
        </div>
        <p className="shrink-0 text-right text-[10px] leading-relaxed text-sky-300/90">
          Bayar sebelum
          <br />
          <span className="font-mono text-[11px] font-semibold text-white">{deadline} WIB</span>
        </p>
      </div>

      <div className="flex items-center gap-3 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[13px] font-bold text-sky-700">
          {PAYMENT_MERCHANT.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-slate-800">
            {payment.merchantName}
          </p>
          <p className="truncate font-mono text-[11px] text-slate-400">{payment.merchantId}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-600 ring-1 ring-sky-100">
          QRIS
        </span>
      </div>
    </motion.aside>
  )
}
