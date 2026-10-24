"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Lock, Mail } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { BRAND } from "@/lib/brand"

const LoginPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email dan password wajib diisi.")
      return
    }

    const nextParam = searchParams.get("next")
    const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "/dashboard"
    const secureAttr = window.location.protocol === "https:" ? "; secure" : ""

    document.cookie = `rl_auth=1; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax${secureAttr}`
    setErrorMessage("")
    router.push(nextPath)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a192f] p-0 font-sans sm:p-6 md:p-8">
      <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px] md:h-[500px] md:w-[500px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px] md:h-[500px] md:w-[500px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex min-h-screen w-full max-w-5xl flex-col overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl sm:min-h-[650px] sm:rounded-[2.5rem] md:flex-row"
      >
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-white/5 p-12 text-white md:flex">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1523240715630-974bb1ad1932?q=80&w=2070&auto=format&fit=crop"
              alt="Academic Background"
              className="h-full w-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 to-indigo-900/90" />
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E\")",
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="mb-16">
              <BrandLogo
                theme="light"
                subtitle="Platform tryout UTBK-SNBT"
                titleClassName="text-white"
                subtitleClassName="text-blue-100/70"
                logoWrapperClassName="border-white/10"
              />
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
              Kembali Melangkah <br /> Menuju <span className="text-blue-400">PTN Impian.</span>
            </h2>
            <p className="max-w-sm text-lg leading-relaxed text-blue-100/70">
              Pantau progres skor IRT dan ukur kemampuanmu dengan simulasi paling akurat hari ini.
            </p>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="mb-4 flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-blue-600 shadow-xl"
                  src={`https://i.pravatar.cc/150?u=${i + 20}`}
                  alt="avatar"
                />
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600 text-[10px] font-bold shadow-xl">
                +12k
              </div>
            </div>
            <p className="text-sm italic leading-relaxed text-blue-100/80">
              "Sistem IRT di sini benar-benar membantu saya memetakan peluang lolos di jurusan pilihan."
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center bg-[#0d1e36]/90 p-8 md:w-1/2 md:bg-transparent sm:p-12 lg:p-16">
          <div className="mb-12 flex justify-center text-center md:hidden">
            <BrandLogo
              theme="light"
              subtitle="Masuk ke akunmu"
              titleClassName="text-white"
              subtitleClassName="text-white/70"
              logoWrapperClassName="border-white/10"
            />
          </div>

          <div className="mb-10 text-center md:text-left">
            <h3 className="mb-3 text-3xl font-bold text-white">Selamat Datang</h3>
            <p className="text-gray-400">Silakan masuk ke dashboard akun Anda.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mb-8 flex w-full items-center justify-center space-x-3 rounded-xl bg-white px-4 py-3.5 font-bold text-gray-900 shadow-lg transition-all hover:bg-gray-100"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm">Masuk dengan Google</span>
          </motion.button>

          <div className="relative mb-8 flex items-center py-4">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-4 flex-shrink text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Atau Email
            </span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="group">
              <label className="ml-1 mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
                Alamat Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3.5 text-white outline-none transition-all focus:border-blue-500 focus:bg-blue-500/5"
                />
                <Mail
                  className="absolute left-4 top-3.5 text-gray-500 transition-colors group-focus-within:text-blue-500"
                  size={18}
                />
              </div>
            </div>

            <div className="group">
              <div className="ml-1 mb-2 flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                <a href="#" className="text-[10px] font-bold text-blue-500 transition-colors hover:text-blue-400">
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3.5 text-white outline-none transition-all focus:border-blue-500 focus:bg-blue-500/5"
                />
                <Lock
                  className="absolute left-4 top-3.5 text-gray-500 transition-colors group-focus-within:text-blue-500"
                  size={18}
                />
              </div>
            </div>

            {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group mt-4 flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-bold text-blue-500 underline underline-offset-4 transition-colors hover:text-blue-400"
            >
              Daftar Gratis
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-gray-600 md:text-left">
            {BRAND.displayName} membantu kamu belajar lebih terarah dengan simulasi yang rapi dan profesional.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
