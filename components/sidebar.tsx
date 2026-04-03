'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LayoutDashboard, BookOpen, Users, Settings, ChevronDown } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/brand'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['soal'])

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuKey)
        ? prev.filter(m => m !== menuKey)
        : [...prev, menuKey]
    )
  }

  const navItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      label: 'Manajemen Soal',
      icon: BookOpen,
      key: 'soal',
      submenu: [
        { label: 'Input Soal Baru', href: '/soal/input' },
        { label: 'Daftar Soal', href: '/soal/list' },
        { label: 'Manajemen Paket', href: '/soal/packages' },
      ],
    },
    {
      label: 'Manajemen Pengguna',
      icon: Users,
      href: '/users',
    },
    {
      label: 'Pengaturan',
      icon: Settings,
      href: '/settings',
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background border-border"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40 md:z-30',
          !isOpen && '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <BrandLogo
              subtitle={BRAND.adminLabel}
              size={42}
              titleClassName="text-sidebar-foreground"
              subtitleClassName="text-muted-foreground"
              logoWrapperClassName="border-sidebar-border"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isExpanded = item.key && expandedMenus.includes(item.key)

              if (item.submenu) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => item.key && toggleMenu(item.key)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors',
                        'hover:bg-sidebar-accent text-sidebar-foreground',
                        isExpanded && 'bg-sidebar-accent'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Submenu */}
                    {isExpanded && (
                      <div className="ml-4 mt-2 space-y-1 border-l border-sidebar-border pl-4">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={cn(
                              'block px-4 py-2 rounded-lg text-sm transition-colors',
                              'text-sidebar-foreground hover:bg-sidebar-accent'
                            )}
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors',
                    'hover:bg-sidebar-accent text-sidebar-foreground'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent">
              <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
                <span className="text-sm font-bold text-sidebar-primary-foreground">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">{BRAND.adminEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden md:block md:w-64" />
    </>
  )
}
