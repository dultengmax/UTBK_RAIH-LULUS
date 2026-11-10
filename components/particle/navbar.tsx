"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'

import { BrandLogo } from '@/components/brand-logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/pricing', label: 'Paket' },
  { href: '/profile', label: 'Dashboard' },
]

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18, ease: 'easeIn' } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const closeMenu = () => setIsOpen(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', closeMenu)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointerdown', handlePointerDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const iconTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }

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
          <motion.button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.92 }}
            className={cn(
              'relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors',
              scrolled
                ? 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100'
                : 'border-white/15 bg-white/10 text-white hover:bg-white/15',
            )}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-4 w-5 flex-col items-center justify-center">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={iconTransition}
                className="absolute h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={iconTransition}
                className="absolute h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                transition={iconTransition}
                className="absolute h-0.5 w-5 rounded-full bg-current"
              />
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            variants={menuVariants}
            initial={shouldReduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            exit="exit"
            className="mx-4 mt-4 origin-top rounded-3xl border border-white/10 bg-slate-950/96 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:hidden"
          >
            <motion.div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  Masuk ke Akun
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
