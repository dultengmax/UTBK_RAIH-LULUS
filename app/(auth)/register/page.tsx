"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ChevronLeft, Sparkles, Star } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { PS2Particles } from "@/components/ps2-background"
import { PlayerHud } from "@/components/register/PlayerHud"
import { ProgressBar } from "@/components/register/ProgressBar"
import { StepAkun } from "@/components/register/StepAkun"
import { StepJurusan } from "@/components/register/StepJurusan"
import { StepKelemahan } from "@/components/register/StepKelemahan"
import { StepKonfirmasi } from "@/components/register/StepKonfirmasi"
import { StepProgram } from "@/components/register/StepProgram"
import { SuccessScreen } from "@/components/register/SuccessScreen"
import { PIXEL_PRESETS, PixelGradient } from "@/components/ui/pixel-gradient"
import {
  ACTION_LABELS,
  OVERSEAS_PROGRAM_ID,
  PROGRAM_FIELD_META,
  REGISTER_PAGE_COPY,
  REGISTER_STEP_META,
} from "@/data/registerData"
import { computeXp, getLevel, getRankTitle } from "@/data/registerGame"
import { useRegisterForm } from "@/hooks/useRegisterForm"
import { cn } from "@/lib/utils"
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
    goToStep,
    submit,
    setSubmitError,
  } = useRegisterForm()

  const [stepError, setStepError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [accountErrors, setAccountErrors] = useState<Partial<Record<AccountFieldId, string>>>({})

  const activeStep = REGISTER_STEP_META[step]
  const totalSteps = REGISTER_STEP_META.length

  const xp = computeXp(data, step)
  const level = getLevel(xp)
  const rankTitle = getRankTitle(level)

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
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#080d20_0%,#111a3d_46%,#1b1145_100%)] font-sans text-white">
      {/* Latar arena — orb yang drift pelan */}
      <motion.div
        className="pointer-events-none absolute left-[-6%] top-[-12%] size-112 rounded-full bg-cyan-500/25 blur-[150px]"
        animate={{ x: [0, 70, -35, 0], y: [0, -50, 25, 0], opacity: [0.6, 1, 0.7, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-[6%] size-120 rounded-full bg-violet-600/25 blur-[170px]"
        animate={{ x: [0, -60, 30, 0], y: [0, 45, -25, 0], opacity: [0.55, 0.95, 0.65, 0.55] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-14%] left-1/3 size-120 rounded-full bg-blue-600/25 blur-[180px]"
        animate={{ x: [0, 55, -30, 0], y: [0, -40, 20, 0], opacity: [0.5, 0.9, 0.6, 0.5] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: -8 }}
      />

      {/* Pita cahaya (light ribbon) ala streak boot PS2 */}
      <motion.div
        className="pointer-events-none absolute -left-1/4 top-[30%] h-44 w-[150%] -rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.26),rgba(59,130,246,0.12)_45%,transparent_70%)] blur-3xl"
        animate={{ x: [0, 80, -45, 0], opacity: [0.4, 0.85, 0.55, 0.4], scale: [1, 1.06, 0.97, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-1/3 bottom-[8%] h-40 w-[160%] rotate-[4deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.26),rgba(99,102,241,0.1)_45%,transparent_70%)] blur-3xl"
        animate={{ x: [0, -85, 50, 0], opacity: [0.35, 0.8, 0.5, 0.35], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: -7 }}
      />


      {/* Gradasi pixel — mosaic kotak yang membentuk transisi warna */}
      <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
        <PixelGradient
          cols={48}
          rows={28}
          from={PIXEL_PRESETS.arena.from}
          mid={PIXEL_PRESETS.arena.mid}
          to={PIXEL_PRESETS.arena.to}
        />
      </div>

      {/* Grid halus menegaskan tekstur pixel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 30%, black, transparent 72%)",
        }}
      />

      {/* Partikel cahaya melayang ala boot screen PS2 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <PS2Particles variant="night" count={44} />
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-0 sm:p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative grid min-h-screen w-full max-w-7xl overflow-hidden border border-white/10 bg-slate-950/40 shadow-[0_40px_140px_rgba(2,6,23,0.6)] backdrop-blur-2xl sm:min-h-0 sm:rounded-[2.25rem] lg:min-h-[720px] lg:grid-cols-[340px_1fr]"
        >
          {/* Gradasi pixel di dalam kartu agar tetap terlihat di layar kecil */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen">
            <PixelGradient
              cols={40}
              rows={24}
              from={PIXEL_PRESETS.card.from}
              mid={PIXEL_PRESETS.card.mid}
              to={PIXEL_PRESETS.card.to}
            />
          </div>

          {/* HUD pemain — 340px */}
          <aside className="relative z-10 hidden flex-col border-r border-white/10 p-6 lg:flex xl:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,41,59,0.5),rgba(2,6,23,0.2))]" />
            {/* Partikel PS2 melayang di panel HUD */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <PS2Particles variant="night" count={16} />
            </div>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 left-1/2 size-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"
              animate={{ y: [0, -24, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative mb-6">
              <BrandLogo
                theme="light"
                subtitle="Raih Lulus Arena"
                titleClassName="text-white"
                subtitleClassName="text-cyan-200/70"
                logoWrapperClassName="border-white/15"
              />
            </div>
            <div className="relative flex-1">
              <PlayerHud data={data} step={step} xp={xp} />
            </div>
          </aside>

          {/* Papan misi */}
          <section className="relative z-10 flex min-h-screen flex-col p-5 sm:p-7 lg:min-h-0 lg:p-8 xl:p-10">
            {/* Header brand (mobile) */}
            <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
              <BrandLogo
                theme="light"
                subtitle={REGISTER_PAGE_COPY.mobileSubtitle}
                titleClassName="text-white"
                subtitleClassName="text-cyan-200/70"
                logoWrapperClassName="border-white/15"
              />
              <Link
                href="/login"
                className="text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
              >
                {ACTION_LABELS.signIn}
              </Link>
            </div>

            {/* Strip pemain (mobile) */}
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden">
              <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-blue-500 to-violet-600 text-lg font-black text-white">
                {(data.name.trim()[0] ?? "P").toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-pixel text-sm font-bold text-white">
                    {data.name.trim() || "Pemain Baru"}
                  </p>
                  <span className="flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 font-pixel text-[11px] font-bold text-amber-300">
                    <Star size={11} /> Lv {level}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/30">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500"
                    initial={false}
                    animate={{ width: `${Math.min(100, Math.round((xp / 600) * 100))}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            </div>

            {/* Quest path */}
            <div className="mb-7 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <ProgressBar step={step} onStepClick={goToStep} />
            </div>

            {/* Judul misi */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 font-pixel text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                <Sparkles size={12} /> Level {level} · {rankTitle}
              </span>
              <h2 className="mt-4 font-pixel text-2xl font-bold leading-snug tracking-tight text-white sm:text-[2rem]">
                {activeStep.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                {activeStep.description}
              </p>
            </div>

            {/* Panel konten misi */}
            <div className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,245,249,0.96)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-5 lg:p-6">
              {/* Partikel PS2 versi terang di belakang konten misi */}
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <motion.div
                  aria-hidden="true"
                  className="absolute -left-16 top-[10%] size-56 rounded-full bg-cyan-300/30 blur-[90px]"
                  animate={{ x: [0, 110, -35, 0], y: [0, 55, -20, 0], opacity: [0.35, 0.75, 0.45, 0.35] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden="true"
                  className="absolute -right-14 bottom-[6%] size-52 rounded-full bg-violet-300/30 blur-[90px]"
                  animate={{ x: [0, -95, 30, 0], y: [0, -60, 22, 0], opacity: [0.3, 0.7, 0.4, 0.3] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: -5 }}
                />
                <PS2Particles variant="light" count={20} />
              </div>

              <div className="relative z-10 h-full">
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
            </div>

            {/* Navigasi misi */}
            <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/50">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
                  {ACTION_LABELS.signIn}
                </Link>
              </p>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                {step > 0 ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={prev}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-5 font-pixel text-sm font-semibold text-white/80 transition-colors hover:bg-white/15"
                  >
                    <ChevronLeft size={18} />
                    {ACTION_LABELS.previous}
                  </motion.button>
                ) : null}

                {step < totalSteps - 1 ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 font-pixel text-sm font-bold text-slate-950 shadow-lg shadow-blue-900/40"
                  >
                    {step === 3 ? ACTION_LABELS.review : ACTION_LABELS.next}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    disabled={submitting}
                    whileHover={submitting ? undefined : { scale: 1.02 }}
                    whileTap={submitting ? undefined : { scale: 0.97 }}
                    onClick={handleSubmit}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 font-pixel text-sm font-bold text-slate-950 shadow-lg shadow-blue-900/40",
                      submitting && "pointer-events-none opacity-70",
                    )}
                  >
                    {submitting ? (
                      <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                    ) : null}
                    {submitting ? ACTION_LABELS.submitting : ACTION_LABELS.submit}
                  </motion.button>
                )}
              </div>
            </div>
          </section>
        </motion.div>
      </div>

      {done ? <SuccessScreen redirectTo="/dashboard" /> : null}
    </div>
  )
}
