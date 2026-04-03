"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"

import { BrandLogo } from "@/components/brand-logo"
import { ProgressBar } from "@/components/register/ProgressBar"
import { StepAkun } from "@/components/register/StepAkun"
import { StepJurusan } from "@/components/register/StepJurusan"
import { StepKelemahan } from "@/components/register/StepKelemahan"
import { StepKonfirmasi } from "@/components/register/StepKonfirmasi"
import { StepProgram } from "@/components/register/StepProgram"
import { SuccessScreen } from "@/components/register/SuccessScreen"
import { AnimButton } from "@/components/ui/AnimButton"
import {
  ACTION_LABELS,
  OVERSEAS_PROGRAM_ID,
  PROGRAM_FIELD_META,
  PROGRAM_LABELS,
  REGISTER_HIGHLIGHTS,
  REGISTER_PAGE_COPY,
  REGISTER_STEP_META,
  UNIVERSITIES,
} from "@/data/registerData"
import { useRegisterForm } from "@/hooks/useRegisterForm"
import { BRAND } from "@/lib/brand"
import type { AccountFieldId, ProgramId, RegisterData } from "@/types/register"

type AccountDataField = "name" | "email" | "username" | "password"

const transitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const usernameRegex = /^[a-z0-9_]+$/

function validateAccount(data: RegisterData, confirmPassword: string) {
  const errors: Partial<Record<AccountFieldId, string>> = {}

  if (!data.name.trim()) {
    errors.name = "Nama lengkap wajib diisi."
  }

  if (!emailRegex.test(data.email.trim())) {
    errors.email = "Masukkan alamat email yang valid."
  }

  if (data.username.trim().length < 4 || !usernameRegex.test(data.username.trim())) {
    errors.username = "Username minimal 4 karakter dan hanya boleh huruf kecil, angka, atau underscore."
  }

  if (data.password.length < 8) {
    errors.password = "Password minimal 8 karakter."
  }

  if (confirmPassword !== data.password) {
    errors.confirmPassword = "Konfirmasi password harus sama dengan password."
  }

  return errors
}

function getTargetLabel(program: ProgramId | "") {
  if (!program) {
    return "Tujuan"
  }

  if (program === OVERSEAS_PROGRAM_ID) {
    return "Jurusan"
  }

  const domesticProgram = program as Exclude<ProgramId, "luar_negeri">
  return PROGRAM_FIELD_META[domesticProgram].label
}

export default function RegisterPage() {
  const {
    step,
    direction,
    data,
    done,
    submitting,
    submitError,
    update,
    next,
    prev,
    submit,
    setSubmitError,
  } = useRegisterForm()

  const [stepError, setStepError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [accountErrors, setAccountErrors] = useState<Partial<Record<AccountFieldId, string>>>({})

  const activeStep = REGISTER_STEP_META[step]
  const targetLabel = getTargetLabel(data.program)
  const selectedUniversity = UNIVERSITIES.find((item) => item.id === data.university) ?? null

  const selectionDetails = [
    {
      label: "Program",
      value: data.program ? PROGRAM_LABELS[data.program] : "Belum dipilih",
    },
    {
      label: data.program === OVERSEAS_PROGRAM_ID ? "Universitas" : targetLabel,
      value:
        data.program === OVERSEAS_PROGRAM_ID
          ? selectedUniversity?.name || "Belum dipilih"
          : data.jurusan || "Belum dipilih",
    },
    {
      label: "Fokus",
      value: data.weaknesses.length > 0 ? `${data.weaknesses.length} area dipilih` : "Belum dipilih",
    },
  ]

  const handleProgramChange = (program: ProgramId) => {
    setStepError("")
    setSubmitError("")
    update({
      program,
      university: "",
      jurusan: "",
      weaknesses: [],
    })
  }

  const handleJurusanChange = (fields: Partial<RegisterData>) => {
    setStepError("")
    setSubmitError("")
    update(fields)
  }

  const handleToggleWeakness = (value: string) => {
    setStepError("")
    setSubmitError("")

    const nextWeaknesses = data.weaknesses.includes(value)
      ? data.weaknesses.filter((item) => item !== value)
      : [...data.weaknesses, value]

    update({ weaknesses: nextWeaknesses })
  }

  const handleAccountFieldChange = (field: AccountDataField, value: string) => {
    setSubmitError("")
    setAccountErrors((previous) => ({
      ...previous,
      [field]: undefined,
      ...(field === "password" ? { confirmPassword: undefined } : {}),
    }))

    update({ [field]: value } as Partial<RegisterData>)
  }

  const handleConfirmPasswordChange = (value: string) => {
    setSubmitError("")
    setAccountErrors((previous) => ({ ...previous, confirmPassword: undefined }))
    setConfirmPassword(value)
  }

  const handleNext = () => {
    if (step === 0) {
      if (!data.program) {
        setStepError("Pilih salah satu program tryout sebelum lanjut ke langkah berikutnya.")
        return
      }

      setStepError("")
      next()
      return
    }

    if (step === 1) {
      if (data.program === OVERSEAS_PROGRAM_ID) {
        if (!data.university || !data.jurusan) {
          setStepError("Pilih universitas dan jurusan terlebih dahulu untuk jalur luar negeri.")
          return
        }
      } else if (!data.jurusan) {
        const label = getTargetLabel(data.program).toLowerCase()
        setStepError(`Pilih ${label} tujuanmu sebelum lanjut.`)
        return
      }

      setStepError("")
      next()
      return
    }

    if (step === 2) {
      if (data.weaknesses.length < 1) {
        setStepError("Pilih minimal satu area kelemahan agar rekomendasi belajarnya bisa lebih personal.")
        return
      }

      setStepError("")
      next()
      return
    }

    if (step === 3) {
      const errors = validateAccount(data, confirmPassword)
      setAccountErrors(errors)

      if (Object.keys(errors).length > 0) {
        return
      }

      next()
    }
  }

  const handleSubmit = async () => {
    const errors = validateAccount(data, confirmPassword)
    setAccountErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    await submit()
  }

  let stepContent = null

  if (step === 0) {
    stepContent = <StepProgram value={data.program} error={stepError} onChange={handleProgramChange} />
  } else if (step === 1) {
    stepContent = (
      <StepJurusan
        program={data.program}
        university={data.university}
        jurusan={data.jurusan}
        error={stepError}
        onChange={handleJurusanChange}
      />
    )
  } else if (step === 2) {
    stepContent = (
      <StepKelemahan
        program={data.program}
        selected={data.weaknesses}
        error={stepError}
        onToggle={handleToggleWeakness}
      />
    )
  } else if (step === 3) {
    stepContent = (
      <StepAkun
        values={{
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password,
        }}
        confirmPassword={confirmPassword}
        errors={accountErrors}
        onFieldChange={handleAccountFieldChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
      />
    )
  } else {
    stepContent = <StepKonfirmasi data={data} submitError={submitError} />
  }

  return (
    <div className="dark min-h-screen overflow-hidden bg-[#0a192f] font-sans">
      <div className="absolute left-[-12%] top-[-12%] size-[24rem] rounded-full bg-sky-600/10 blur-[120px]" />
      <div className="absolute bottom-[-12%] right-[-10%] size-[28rem] rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative flex min-h-screen items-center justify-center p-0 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid min-h-screen w-full max-w-7xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:min-h-[780px] lg:rounded-[2.5rem] xl:grid-cols-[1.02fr_1.18fr]"
        >
          <aside className="relative hidden overflow-hidden border-r border-white/6 p-10 xl:flex xl:flex-col xl:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_42%)]" />
            <div className="relative z-10">
              <BrandLogo
                theme="light"
                subtitle={REGISTER_PAGE_COPY.heroSubtitle}
                titleClassName="text-white"
                subtitleClassName="text-white/70"
                logoWrapperClassName="border-white/10"
              />

              <div className="mt-14 space-y-6">
                <div className="space-y-4">
                  <h1 className="max-w-lg text-4xl font-bold leading-tight text-white">
                    {REGISTER_PAGE_COPY.heroTitle}
                  </h1>
                  <p className="max-w-md text-base leading-relaxed text-white/68">
                    {REGISTER_PAGE_COPY.heroDescription}
                  </p>
                </div>

                <div className="grid gap-3">
                  {REGISTER_HIGHLIGHTS.map((highlight) => (
                    <div
                      key={highlight.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">{highlight.label}</p>
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          {highlight.value}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/62">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <div>
                <p className="text-sm font-semibold text-white">{REGISTER_PAGE_COPY.sideCardTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/62">
                  {REGISTER_PAGE_COPY.sideCardDescription}
                </p>
              </div>

              <div className="space-y-3 border-t border-white/8 pt-4">
                {selectionDetails.map((detail) => (
                  <div key={detail.label} className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/38">{detail.label}</span>
                    <span className="text-sm font-medium text-white/82">{detail.value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm italic leading-relaxed text-white/70">
                {REGISTER_PAGE_COPY.testimonial}
                <p className="mt-3 text-xs not-italic uppercase tracking-[0.2em] text-white/38">
                  {REGISTER_PAGE_COPY.testimonialAuthor}
                </p>
              </div>
            </div>
          </aside>

          <section className="flex min-h-screen flex-col bg-[#0d1e36]/90 px-6 py-8 sm:px-8 lg:px-10 lg:py-10 xl:min-h-0 xl:bg-transparent">
            <div className="mb-8 flex items-center justify-between gap-4 xl:hidden">
              <BrandLogo
                theme="light"
                subtitle={REGISTER_PAGE_COPY.mobileSubtitle}
                titleClassName="text-white"
                subtitleClassName="text-white/70"
                logoWrapperClassName="border-white/10"
              />
              <Link
                href="/login"
                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {ACTION_LABELS.signIn}
              </Link>
            </div>

            <div className="mb-8">
              <ProgressBar step={step} />
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
                Step {step + 1} / {REGISTER_STEP_META.length}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">{activeStep.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62">
                {activeStep.description}
              </p>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={transitionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full"
                >
                  {stepContent}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm text-white/55">{REGISTER_PAGE_COPY.footerDescription}</p>
                <p className="text-xs text-white/35">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                    {ACTION_LABELS.signIn}
                  </Link>
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                {step > 0 ? (
                  <AnimButton variant="outline" onClick={prev}>
                    {ACTION_LABELS.previous}
                  </AnimButton>
                ) : null}

                {step < REGISTER_STEP_META.length - 1 ? (
                  <AnimButton onClick={handleNext}>
                    {step === 3 ? ACTION_LABELS.review : ACTION_LABELS.next}
                  </AnimButton>
                ) : (
                  <AnimButton loading={submitting} onClick={handleSubmit}>
                    {submitting ? ACTION_LABELS.submitting : ACTION_LABELS.submit}
                  </AnimButton>
                )}
              </div>
            </div>

            <p className="mt-6 text-xs text-white/28">
              {BRAND.displayName} membantu pengguna baru langsung masuk ke alur belajar yang lebih terarah.
            </p>
          </section>
        </motion.div>
      </div>

      {done ? <SuccessScreen redirectTo="/dashboard" /> : null}
    </div>
  )
}
