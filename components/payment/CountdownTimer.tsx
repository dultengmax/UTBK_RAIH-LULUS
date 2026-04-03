"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { type CountdownState } from "@/types/payment"

type CountdownTimerProps = {
  initialSeconds: number
  onStateChange?: (state: CountdownState) => void
}

const formatClock = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
}

export default function CountdownTimer({ initialSeconds, onStateChange }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const expired = seconds <= 0
  const display = useMemo(() => formatClock(seconds), [seconds])

  useEffect(() => {
    if (expired) {
      return
    }

    const timer = window.setInterval(() => {
      setSeconds((previous) => Math.max(previous - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [expired])

  useEffect(() => {
    onStateChange?.({ seconds, display, expired })
  }, [display, expired, onStateChange, seconds])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="flex items-center justify-between rounded-lg border border-sky-200 bg-white px-4 py-3"
    >
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {!expired ? (
            <motion.span
              key="active-dot"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-2.5 w-2.5 rounded-full bg-orange-400 animate-pulse"
            />
          ) : null}
        </AnimatePresence>
        <p className={`text-xs ${expired ? "font-semibold text-red-600" : "text-orange-500"}`}>
          {expired ? "Waktu habis" : "Selesaikan pembayaran dalam"}
        </p>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={expired ? "00:00" : display}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className={`text-xs font-semibold ${expired ? "text-red-600" : "text-orange-500"}`}
        >
          {expired ? "00:00" : display}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
