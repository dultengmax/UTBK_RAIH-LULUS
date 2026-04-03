"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { ACCOUNT_FIELDS, PASSWORD_RULES } from "@/data/registerData"
import { Input } from "@/components/ui/input"
import type { AccountFieldId, RegisterData } from "@/types/register"

type AccountDataField = "name" | "email" | "username" | "password"

interface StepAkunProps {
  values: Pick<RegisterData, AccountDataField>
  confirmPassword: string
  errors: Partial<Record<AccountFieldId, string>>
  onFieldChange: (field: AccountDataField, value: string) => void
  onConfirmPasswordChange: (value: string) => void
}

const strengthLabels = ["Sangat lemah", "Dasar terpenuhi", "Mulai kuat", "Kuat", "Sangat kuat"]

function getPasswordChecks(password: string) {
  return {
    length: password.length >= 8,
    case: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }
}

function getPasswordScore(password: string) {
  const checks = getPasswordChecks(password)
  return Object.values(checks).filter(Boolean).length
}

function isDataField(field: AccountFieldId): field is AccountDataField {
  return field === "name" || field === "email" || field === "username" || field === "password"
}

function PasswordToggleIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
        <path
          d="M3 3 21 21M10.58 10.59a2 2 0 0 0 2.83 2.82M9.88 5.09A9.77 9.77 0 0 1 12 4.8c5.5 0 9.27 4.52 10 5.46a1.2 1.2 0 0 1 0 1.48 17.88 17.88 0 0 1-4.29 3.99M6.35 6.35A17.72 17.72 0 0 0 2 10.26a1.2 1.2 0 0 0 0 1.48c.74.94 4.51 5.46 10 5.46a9.9 9.9 0 0 0 4.04-.83"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
      <path
        d="M2 12.24c.73-.94 4.5-5.44 10-5.44s9.27 4.5 10 5.44a1.22 1.22 0 0 1 0 1.52c-.73.94-4.5 5.44-10 5.44S2.73 14.7 2 13.76a1.22 1.22 0 0 1 0-1.52Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function StepAkun({
  values,
  confirmPassword,
  errors,
  onFieldChange,
  onConfirmPasswordChange,
}: StepAkunProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordScore = getPasswordScore(values.password)
  const passwordChecks = getPasswordChecks(values.password)
  const passwordStrengthLabel = strengthLabels[passwordScore]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {ACCOUNT_FIELDS.map((field) => {
          const isPasswordField = field.id === "password" || field.id === "confirmPassword"
          const isVisible =
            field.id === "password" ? showPassword : field.id === "confirmPassword" ? showConfirmPassword : false
          const value = isDataField(field.id) ? values[field.id] : confirmPassword
          const inputType = isPasswordField ? (isVisible ? "text" : "password") : field.type

          return (
            <div
              key={field.id}
              className={field.id === "password" || field.id === "confirmPassword" ? "sm:col-span-2" : ""}
            >
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                {field.label}
              </label>

              <div className="relative">
                <Input
                  type={inputType}
                  value={value}
                  autoComplete={field.autoComplete}
                  onChange={(event) =>
                    isDataField(field.id)
                      ? onFieldChange(field.id, event.target.value)
                      : onConfirmPasswordChange(event.target.value)
                  }
                  placeholder={field.placeholder}
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.03] px-4 text-white placeholder:text-white/35 focus-visible:border-primary/50 focus-visible:ring-primary/15"
                />

                {isPasswordField ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      field.id === "password"
                        ? setShowPassword((value) => !value)
                        : setShowConfirmPassword((value) => !value)
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 text-white/55 transition-colors hover:text-white"
                  >
                    <PasswordToggleIcon visible={isVisible} />
                  </motion.button>
                ) : null}
              </div>

              <p className="mt-2 text-xs text-white/45">{field.helper}</p>

              <AnimatePresence>
                {errors[field.id] ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-sm text-rose-200"
                  >
                    {errors[field.id]}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Kekuatan password</p>
            <p className="mt-1 text-sm text-white/60">{passwordStrengthLabel}</p>
          </div>

          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {passwordScore}/4 indikator
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, index) => {
            const isActive = passwordScore > index

            return (
              <div key={`strength-${index}`} className="h-2 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  animate={{ scaleX: isActive ? 1 : 0.2 }}
                  style={{ transformOrigin: "left center" }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            )
          })}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {PASSWORD_RULES.map((rule) => {
            const isActive = passwordChecks[rule.id as keyof typeof passwordChecks]

            return (
              <div key={rule.id} className="flex items-center gap-2 text-sm">
                <span
                  className={
                    isActive
                      ? "flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      : "flex size-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40"
                  }
                >
                  <svg viewBox="0 0 20 20" className="size-3" fill="none" aria-hidden="true">
                    <path
                      d="M5 10.5 8.4 14 15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className={isActive ? "text-white/80" : "text-white/50"}>{rule.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
