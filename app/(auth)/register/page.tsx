"use client"

import { lazy, Suspense, useState, type CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, Sparkles, Star } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { PS2Particles } from "@/components/ps2-background"
import { PlayerHud } from "@/components/register/PlayerHud"
import { ProgressBar } from "@/components/register/ProgressBar"
import { StepKelemahan } from "@/components/register/StepKelemahan"
import { StepProgram } from "@/components/register/StepProgram"
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

// Step yang jarang dibuka pertama kali dimuat saat dibutuhkan saja
// agar bundle awal halaman register tetap ringan.
const StepJurusan = lazy(() =>
  import("@/components/register/StepJurusan").then((module) => ({ default: module.StepJurusan })),
)
const StepAkun = lazy(() =>
  import("@/components/register/StepAkun").then((module) => ({ default: module.StepAkun })),
)
const StepKonfirmasi = lazy(() =>
  import("@/components/register/StepKonfirmasi").then((module) => ({ default: module.StepKonfirmasi })),
)
const SuccessScreen = lazy(() =>
  import("@/components/register/SuccessScreen").then((module) => ({ default: module.SuccessScreen })),
)

type AccountDataField = "name" | "email" | "username" | "password"

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

  const stepFallback = (
    <div className="flex h-full min-h-40 items-center justify-center gap-3">
      <span className="size-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
      <span className="text-sm text-slate-400">Memuat langkah...</span>
    </div>
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#080d20_0%,#111a3d_46%,#1b1145_100%)] font-sans text-white">
      {/* Latar arena — orb yang drift pelan (CSS-only, ringan) */}
      <div
        className="ps2-orb left-[-6%] top-[-12%] size-112 bg-cyan-500/25 blur-[100px]"
        style={{ "--ps2-x": "70px", "--ps2-y": "-50px", animationDuration: "20s" } as CSSProperties}
      />
      <div
        className="ps2-orb right-[-10%] top-[6%] size-120 bg-violet-600/25 blur-[110px]"
        style={{ "--ps2-x": "-60px", "--ps2-y": "45px", animationDuration: "24s", animationDelay: "-9s" } as CSSProperties}
      />
      <div
        className="ps2-orb bottom-[-14%] left-1/3 size-120 bg-blue-600/25 blur-[120px]"
        style={{ "--ps2-x": "55px", "--ps2-y": "-40px", animationDuration: "22s", animationDelay: "-8s" } as CSSProperties}
      />

      {/* Pita cahaya (light ribbon) ala streak boot PS2 */}
      <div
        className="ps2-ribbon -left-1/4 top-[30%] h-44 w-[150%] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.26),rgba(59,130,246,0.12)_45%,transparent_70%)] blur-2xl"
        style={{ "--ps2-rot": "-6deg", "--ps2-x": "80px", animationDuration: "17s" } as CSSProperties}
      />
      <div
        className="ps2-ribbon -left-1/3 bottom-[8%] h-40 w-[160%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.26),rgba(99,102,241,0.1)_45%,transparent_70%)] blur-2xl"
        style={{ "--ps2-rot": "4deg", "--ps2-x": "-85px", animationDuration: "21s", animationDelay: "-7s" } as CSSProperties}
      />


      {/* Gradasi pixel — statis (tanpa rect SVG massal) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 15%, rgba(56,110,220,0.75), transparent 34%), radial-gradient(circle at 82% 18%, rgba(139,92,246,0.7), transparent 32%), radial-gradient(circle at 68% 82%, rgba(37,99,235,0.7), transparent 36%), radial-gradient(circle at 20% 80%, rgba(34,211,238,0.6), transparent 32%)",
        }}
      />

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
        <PS2Particles variant="night" count={28} />
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-0 sm:p-4 lg:p-6">
        <div className="anim-fade-up relative grid min-h-screen w-full max-w-7xl overflow-hidden border border-white/10 bg-slate-950/70 shadow-[0_40px_140px_rgba(2,6,23,0.6)] sm:min-h-0 sm:rounded-[2.25rem] lg:min-h-[720px] lg:grid-cols-[340px_1fr]">
          {/* Gradasi pixel di dalam kartu (statis) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14% 18%, rgba(37,99,235,0.8), transparent 32%), radial-gradient(circle at 84% 22%, rgba(124,58,237,0.75), transparent 34%), radial-gradient(circle at 62% 80%, rgba(56,110,220,0.7), transparent 34%)",
            }}
          />

          {/* HUD pemain — 340px */}
          <aside className="relative z-10 hidden flex-col border-r border-white/10 p-6 lg:flex xl:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,41,59,0.5),rgba(2,6,23,0.2))]" />
            {/* Partikel PS2 melayang di panel HUD */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <PS2Particles variant="night" count={10} />
            </div>
            <div
              className="ps2-orb -bottom-16 left-[calc(50%-7rem)] size-56 bg-cyan-400/20 blur-3xl"
              style={{ "--ps2-x": "0px", "--ps2-y": "-24px", animationDuration: "12s" } as CSSProperties}
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
                  <div
                    className="h-full rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 transition-[width] duration-500 ease-out"
                    style={{ width: `${Math.min(100, Math.round((xp / 600) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quest path */}
            <div className="mb-7 rounded-3xl border border-white/10 bg-white/5 p-5">
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
                <div
                  className="ps2-orb -left-16 top-[10%] size-56 bg-cyan-300/30 blur-[70px]"
                  style={{ "--ps2-x": "110px", "--ps2-y": "55px", animationDuration: "16s" } as CSSProperties}
                />
                <div
                  className="ps2-orb -right-14 bottom-[6%] size-52 bg-violet-300/30 blur-[70px]"
                  style={{ "--ps2-x": "-95px", "--ps2-y": "-60px", animationDuration: "20s", animationDelay: "-5s" } as CSSProperties}
                />
                <PS2Particles variant="light" count={14} />
              </div>

              <div className="relative z-10 h-full">
                <Suspense fallback={stepFallback}>
                  <div
                    key={step}
                    className="anim-fade-up h-full"
                    style={{ animationDuration: "0.28s" }}
                  >
                    {stepContent}
                  </div>
                </Suspense>
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
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-5 font-pixel text-sm font-semibold text-white/80 transition-all hover:bg-white/15 hover:scale-[1.02] active:scale-[0.97]"
                  >
                    <ChevronLeft size={18} />
                    {ACTION_LABELS.previous}
                  </button>
                ) : null}

                {step < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 font-pixel text-sm font-bold text-slate-950 shadow-lg shadow-blue-900/40 transition-transform hover:scale-[1.02] active:scale-[0.97]"
                  >
                    {step === 3 ? ACTION_LABELS.review : ACTION_LABELS.next}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 font-pixel text-sm font-bold text-slate-950 shadow-lg shadow-blue-900/40 transition-transform hover:scale-[1.02] active:scale-[0.97]",
                      submitting && "pointer-events-none opacity-70",
                    )}
                  >
                    {submitting ? (
                      <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                    ) : null}
                    {submitting ? ACTION_LABELS.submitting : ACTION_LABELS.submit}
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {done ? <SuccessScreen redirectTo="/dashboard" /> : null}
    </div>
  )
}
