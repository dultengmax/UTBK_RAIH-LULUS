"use client"

import { motion } from "motion/react";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

import { BrandLogo } from '@/components/brand-logo';
import { BRAND } from '@/lib/brand';

const quickLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Paket Belajar', href: '/pricing' },
  { label: 'Dashboard Siswa', href: '/profile' },
  { label: 'Login', href: '/login' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050c1a] pb-10 pt-20">
      <div className="absolute right-0 top-0 h-75 w-75 rounded-full bg-blue-600/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <BrandLogo
              theme="light"
              subtitle="Platform tryout UTBK-SNBT"
              titleClassName="text-white"
              subtitleClassName="text-white/65"
              logoWrapperClassName="border-white/15"
            />
            <p className="leading-relaxed text-gray-400">{BRAND.description}</p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, textShadow: "0px 0px 8px rgb(59, 130, 246)" }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-blue-400"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Navigasi</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="group inline-flex items-center text-gray-400 transition-all hover:translate-x-2 hover:text-blue-400">
                    <ArrowRight size={14} className="mr-2 opacity-0 transition-all group-hover:opacity-100" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Bantuan</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={20} className="shrink-0 text-blue-500" />
                <span>{BRAND.location}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="shrink-0 text-blue-500" />
                <span>{BRAND.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="shrink-0 text-blue-500" />
                <span>{BRAND.supportEmail}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Update Terbaru</h3>
            <p className="mb-4 text-sm text-gray-400">Dapatkan info tryout terbaru, promo paket, dan tips belajar langsung di emailmu.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email kamu..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-blue-500 focus:outline-none"
              />
              <button className="absolute bottom-2 right-2 top-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-500">
                Gabung
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between space-y-4 border-t border-white/5 pt-8 text-sm text-gray-500 md:flex-row md:space-y-0">
          <p>&copy; {currentYear} {BRAND.displayName}. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex space-x-8">
            <a href="/pricing" className="transition-colors hover:text-white">Paket Belajar</a>
            <a href="/login" className="transition-colors hover:text-white">Masuk</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
