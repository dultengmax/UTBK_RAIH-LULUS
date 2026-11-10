/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Pastikan browser tidak menyajikan bundle lama setelah deploy,
  // dan kompresi aktif pada respons SSR.
  compress: true,
  poweredByHeader: false,
  compiler: {
    // Buang console.* di produksi untuk bundle lebih kecil.
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
}

export default nextConfig
