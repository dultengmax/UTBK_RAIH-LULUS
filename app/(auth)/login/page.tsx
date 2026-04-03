"use client"
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from '@/components/brand-logo';
import { BRAND } from '@/lib/brand';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-0 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Background Glow Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/5 border border-white/10 sm:rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col md:flex-row min-h-screen sm:min-h-[650px]"
      >
        
        {/* LEFT SIDE: VISUAL & IMAGE (Sembunyi di Mobile < 768px) */}
        <div className="hidden md:flex md:w-1/2 p-12 text-white flex-col justify-between relative overflow-hidden border-r border-white/5">
          {/* BACKGROUND IMAGE DENGAN OVERLAY */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1523240715630-974bb1ad1932?q=80&w=2070&auto=format&fit=crop" 
              alt="Academic Background"
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            {/* Gradient Overlay untuk memastikan teks terbaca */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 to-indigo-900/90" />
            
            {/* Grid Pattern Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")` }} 
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
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Kembali Melangkah <br /> Menuju <span className="text-blue-400">PTN Impian.</span>
            </h2>
            <p className="text-blue-100/70 text-lg max-w-sm leading-relaxed">
              Pantau progres skor IRT dan ukur kemampuanmu dengan simulasi paling akurat hari ini.
            </p>
          </div>

          <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 shadow-xl" src={`https://i.pravatar.cc/150?u=${i+20}`} alt="avatar" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-600 flex items-center justify-center text-[10px] font-bold shadow-xl">
                +12k
              </div>
            </div>
            <p className="text-sm text-blue-100/80 italic leading-relaxed">
              "Sistem IRT di sini benar-benar membantu saya memetakan peluang lolos di jurusan pilihan."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM (Penuh di Mobile) */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#0d1e36]/90 md:bg-transparent">
          {/* Logo Mobile Only */}
          <div className="md:hidden mb-12 flex justify-center text-center">
            <BrandLogo
              theme="light"
              subtitle="Masuk ke akunmu"
              titleClassName="text-white"
              subtitleClassName="text-white/70"
              logoWrapperClassName="border-white/10"
            />
          </div>

          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white mb-3">Selamat Datang</h3>
            <p className="text-gray-400">Silakan masuk ke dashboard akun Anda.</p>
          </div>

          {/* OAUTH GOOGLE */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-white text-gray-900 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:bg-gray-100 transition-all mb-8"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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

          <div className="relative flex items-center py-4 mb-8">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">Atau Email</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* FORM */}
          <form className="space-y-6">
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1 tracking-widest">Alamat Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-12 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all outline-none"
                />
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors">Lupa Password?</a>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-12 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all outline-none"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center space-x-2 group mt-4"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <p className="mt-10 text-center text-gray-500 text-sm">
            Belum punya akun? {" "}
            <Link href="/register" className="text-blue-500 font-bold hover:text-blue-400 transition-colors underline underline-offset-4">Daftar Gratis</Link>
          </p>

          <p className="mt-6 text-center text-xs text-gray-600 md:text-left">
            {BRAND.displayName} membantu kamu belajar lebih terarah dengan simulasi yang rapi dan profesional.
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;
