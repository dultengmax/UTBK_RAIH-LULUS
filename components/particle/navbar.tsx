"use client"

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { BrandLogo } from '@/components/brand-logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/pricing', label: 'Paket' },
  { href: '/profile', label: 'Dashboard' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const closeMenu = () => setIsOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [isOpen])

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/96 py-3 shadow-lg shadow-slate-900/8 backdrop-blur-xl' : 'bg-transparent py-5',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo
          priority
          theme={scrolled ? 'dark' : 'light'}
          subtitle={scrolled ? 'Platform tryout UTBK-SNBT' : 'Belajar lebih terarah'}
          titleClassName={scrolled ? 'text-slate-900' : 'text-white'}
          subtitleClassName={scrolled ? 'text-slate-500' : 'text-white/75'}
          logoWrapperClassName={scrolled ? 'border-slate-200/80' : 'border-white/15'}
        />

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                scrolled ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950' : 'text-white/90 hover:bg-white/10 hover:text-white',
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/login"
            className={cn(
              'ml-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
              scrolled
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700'
                : 'bg-white text-slate-900 shadow-lg shadow-slate-950/15 hover:bg-slate-100',
            )}
          >
            Masuk
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors',
              scrolled
                ? 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100'
                : 'border-white/15 bg-white/10 text-white hover:bg-white/15',
            )}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="mx-4 mt-4 rounded-3xl border border-white/10 bg-slate-950/96 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
