"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/particle/navbar';
import Footer from '@/components/particle/footer';
import { BRAND } from '@/lib/brand';

const pricingData = [
  {
    id: 'snbt',
    category: 'SNBT',
    title: 'Paket SNBT Harian',
    originalPrice: 50000,
    promoPrice: 25000,
    discount: 50,
    formattedOriginal: 'Rp 50.000',
    formattedPromo: 'Rp 25.000',
    features: [
      'Akses tryout SNBT setiap hari',
      'Pembahasan lengkap setiap soal',
      'Analisis performa mendalam',
      'Tersedia untuk semua mata pelajaran',
      'Akses forum diskusi',
      'Bonus ebook SNBT (Rp 50.000)'
    ],
    buttonText: 'Pilih Paket SNBT',
    gradient: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-600',
    shadowColor: 'shadow-blue-200',
    badgeColor: 'bg-blue-500',
    popular: false,
    savings: 'Hemat Rp 25.000'
  },
  {
    id: 'stan',
    category: 'STAN',
    title: 'Paket STAN Harian',
    originalPrice: 60000,
    promoPrice: 30000,
    discount: 50,
    formattedOriginal: 'Rp 60.000',
    formattedPromo: 'Rp 30.000',
    features: [
      'Akses tryout STAN setiap hari',
      'Pembahasan lengkap setiap soal',
      'Analisis performa mendalam',
      'Fokus pada TPA & TBI',
      'Simulasi CAT real-time',
      'Video tutorial eksklusif'
    ],
    buttonText: 'Pilih Paket STAN',
    gradient: 'from-indigo-500 to-indigo-600',
    borderColor: 'border-indigo-600',
    shadowColor: 'shadow-indigo-200',
    badgeColor: 'bg-indigo-500',
    popular: false,
    savings: 'Hemat Rp 30.000'
  },
  {
    id: 'cpns',
    category: 'CPNS',
    title: 'Paket CPNS Harian',
    originalPrice: 70000,
    promoPrice: 35000,
    discount: 50,
    formattedOriginal: 'Rp 70.000',
    formattedPromo: 'Rp 35.000',
    features: [
      'Akses tryout CPNS setiap hari',
      'Pembahasan lengkap setiap soal',
      'Analisis performa mendalam',
      'TWK, TIU, TKP lengkap',
      'Update materi terbaru',
      'Bank soal 5000+'
    ],
    buttonText: 'Pilih Paket CPNS',
    gradient: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-600',
    shadowColor: 'shadow-purple-200',
    badgeColor: 'bg-purple-500',
    popular: false,
    savings: 'Hemat Rp 35.000'
  },
  {
    id: 'all-access',
    category: 'ALL ACCESS',
    title: 'Paket All Access raihlulus',
    originalPrice: 150000,
    promoPrice: 75000,
    discount: 50,
    formattedOriginal: 'Rp 150.000',
    formattedPromo: 'Rp 75.000',
    features: [
      'Akses semua tryout (SNBT, STAN, CPNS)',
      'Pembahasan lengkap setiap soal',
      'Analisis performa mendalam',
      'Fitur premium & prioritas',
      'Konsultasi privat dengan mentor',
      'Garansi lulus atau uang kembali'
    ],
    buttonText: 'Pilih Paket All Access',
    gradient: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-600',
    shadowColor: 'shadow-amber-200',
    badgeColor: 'bg-orange-500',
    popular: true,
    savings: 'Hemat Rp 75.000'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const paymentProgramMap: Record<string, string> = {
  snbt: 'utbk',
  stan: 'kedinasan',
  cpns: 'cpns',
  'all-access': 'all',
};

const getPaymentHref = (tierId: string) => {
  const normalizedId = tierId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().padEnd(5, 'X').slice(0, 5);
  const orderId = `TRY-2025-${normalizedId}`;
  const program = paymentProgramMap[tierId] ?? 'all';
  return `/payment/${orderId}?program=${program}`;
};

const DiscountBadge = ({ discount, color }: { discount: number; color: string }) => (
  <motion.div
    initial={{ rotate: -45, x: -50, y: -50, opacity: 0 }}
    animate={{ rotate: -45, x: 0, y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
    className={`absolute -top-2 -left-8 w-32 h-8 ${color} transform rotate-[-45deg] flex items-center justify-center shadow-lg z-20`}
  >
    <span className="text-white font-bold text-sm">Diskon {discount}%</span>
  </motion.div>
);

const SavingsBadge = ({ savings }: { savings: string }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.7, type: 'spring' }}
    className="absolute -right-2 top-20 bg-green-500 text-white px-3 py-1 rounded-l-full text-xs font-bold shadow-lg z-20"
  >
    {savings}
  </motion.div>
);

const PricingPage = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Promo Spesial - Paket Tryout SNBT, STAN, CPNS | {BRAND.displayName}</title>
        <meta name="description" content="Dapatkan diskon 50% untuk semua paket tryout. Promo terbatas! Persiapan SNBT, STAN, dan CPNS dengan harga spesial." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-200 to-indigo-100">
        <Navbar />
        
        <main className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section dengan Animasi */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {/* Promo Banner */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block mb-6"
              >
                <span className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  FLASH SALE 50% OFF
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                Promo Spesial Bulan Ini
              </motion.h1>
              <motion.p 
                className="mt-4 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Dapatkan diskon 50% untuk semua paket {BRAND.displayName}. Persiapan maksimal dengan harga terjangkau
                untuk SNBT, STAN, dan CPNS.
              </motion.p>

              {/* Countdown Timer Sederhana */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex justify-center gap-4"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <span className="text-2xl font-bold text-indigo-600">12</span>
                  <span className="text-sm text-slate-600 ml-1">Jam</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <span className="text-2xl font-bold text-indigo-600">45</span>
                  <span className="text-sm text-slate-600 ml-1">Menit</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <span className="text-2xl font-bold text-indigo-600">30</span>
                  <span className="text-sm text-slate-600 ml-1">Detik</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Pricing Cards Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {pricingData.map((tier) => (
                <motion.div
                  key={tier.id}
                  variants={itemVariants as any}
                  onHoverStart={() => setHoveredCard(tier.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ 
                    y: -8,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                  className="relative group"
                >
                  {/* Discount Badge */}
                  {/* <DiscountBadge discount={tier.discount} color={tier.badgeColor} /> */}
                  
                  {/* Savings Badge */}
                  <SavingsBadge savings={tier.savings} />

                  {/* Popular Badge */}
                  {tier.popular && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: 'spring' }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30"
                    >
                      <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                        Paling Populer
                      </span>
                    </motion.div>
                  )}

                  {/* Card */}
                  <div className={`relative h-full flex flex-col bg-white rounded-3xl shadow-xl ${tier.shadowColor} hover:shadow-2xl transition-shadow duration-300 overflow-hidden border-2 ${tier.borderColor}`}>
                    
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-r ${tier.gradient} px-6 py-4 relative overflow-hidden`}>
                      <motion.div
                        animate={{
                          scale: hoveredCard === tier.id ? 1.2 : 1,
                          rotate: hoveredCard === tier.id ? 5 : 0,
                        }}
                        className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"
                      />
                      <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                        {tier.category}
                      </p>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {tier.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-8">
                      {/* Price dengan Coretan dan Promo */}
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-lg text-slate-400 line-through">
                            {tier.formattedOriginal}
                          </span>
                          <motion.span
                            animate={{
                              scale: hoveredCard === tier.id ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                          >
                            -{tier.discount}%
                          </motion.span>
                        </div>
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-extrabold text-slate-800">
                            {tier.formattedPromo}
                          </span>
                          <span className="text-lg text-slate-500 ml-1">/hari</span>
                        </div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-green-600 font-semibold mt-2"
                        >
                          {tier.savings}
                        </motion.p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4">
                        {tier.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-start text-slate-600"
                          >
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-sm sm:text-base">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Bonus Badge untuk Paket Tertentu */}
                      {tier.id === 'all-access' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block"
                        >
                          Bonus Eksklusif
                        </motion.div>
                      )}
                    </div>

                    {/* Button */}
                    <div className="px-6 pb-8">
                      <motion.a
                        href={getPaymentHref(tier.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block w-full bg-gradient-to-r ${tier.gradient} text-white text-center font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group/btn`}
                      >
                        <span className="relative z-10">{tier.buttonText}</span>
                        <motion.div
                          animate={{
                            x: ['0%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        />
                      </motion.a>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Section dengan Promo Tambahan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-20"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Promo Spesial Tambahan</h2>
                  <p className="text-xl mb-6">Beli 2 paket, dapatkan 1 paket gratis plus konsultasi gratis 30 menit.</p>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Klaim Promo Sekarang
                  </motion.a>
                  <p className="text-sm mt-4 text-indigo-200">*Syarat dan ketentuan berlaku. Promo terbatas!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PricingPage;
