"use client"

import { useState } from "react"

import { REGISTER_INITIAL_DATA } from "@/data/registerData"
import type { RegisterData, SubmitResult } from "@/types/register"

export function useRegisterForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<RegisterData>(REGISTER_INITIAL_DATA)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const update = (fields: Partial<RegisterData>) =>
    setData((previous) => ({ ...previous, ...fields }))

  const next = () => {
    setDirection(1)
    setStep((current) => Math.min(current + 1, 4))
  }

  const prev = () => {
    setDirection(-1)
    setStep((current) => Math.max(current - 1, 0))
  }

  const goToStep = (nextStep: number) => {
    setDirection(nextStep >= step ? 1 : -1)
    setStep(Math.min(Math.max(nextStep, 0), 4))
  }

  const reset = () => {
    setStep(0)
    setDirection(1)
    setData(REGISTER_INITIAL_DATA)
    setDone(false)
    setSubmitting(false)
    setSubmitError("")
  }

  const submit = async (): Promise<SubmitResult> => {
    setSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { message?: string }
          | null

        throw new Error(payload?.message ?? "Pendaftaran belum bisa diproses saat ini.")
      }

      setDone(true)
      return { ok: true }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kendala saat mengirim data pendaftaran."

      setSubmitError(message)
      return { ok: false, message }
    } finally {
      setSubmitting(false)
    }
  }

  return {
    step,
    direction,
    data,
    done,
    submitting,
    submitError,
    update,
    next,
    prev,
    goToStep,
    reset,
    submit,
    setSubmitError,
  }
}
