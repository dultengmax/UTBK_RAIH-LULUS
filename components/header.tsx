'use client'

import { Bell, CheckCircle, AlertCircle } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SyncStatus {
  status: 'synced' | 'syncing' | 'error'
  timestamp: string
}

interface HeaderProps {
  syncStatus?: SyncStatus
}

export function Header({ syncStatus = { status: 'synced', timestamp: 'Baru saja' } }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-background border-b border-border h-16 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="sm:hidden">
            <BrandLogo
              showName={false}
              size={38}
              logoWrapperClassName="border-border"
            />
          </div>
          <div className="hidden sm:block">
            <BrandLogo
              subtitle="Workspace Admin"
              size={38}
              titleClassName="text-foreground"
              subtitleClassName="text-muted-foreground"
              logoWrapperClassName="border-border"
            />
          </div>
          <div className="hidden xl:block">
            <p className="text-sm font-semibold text-foreground">Operasional Konten</p>
            <p className="text-xs text-muted-foreground">Kelola soal, paket, dan pengguna dari satu tempat.</p>
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Sync Status */}
          <div className="hidden md:flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            {syncStatus.status === 'synced' && (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs text-muted-foreground">Tersinkronisasi</span>
              </>
            )}
            {syncStatus.status === 'syncing' && (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-xs text-muted-foreground">Sinkronisasi...</span>
              </>
            )}
            {syncStatus.status === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-xs text-muted-foreground">Error</span>
              </>
            )}
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifikasi</span>
                <span className="text-xs text-muted-foreground font-normal">3 baru</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                  <p className="font-medium text-sm">Soal berhasil dipublikasikan</p>
                  <p className="text-xs text-muted-foreground">5 menit yang lalu</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                  <p className="font-medium text-sm">Draft tersimpan secara otomatis</p>
                  <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                  <p className="font-medium text-sm">Paket soal baru tersedia</p>
                  <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-xs text-primary cursor-pointer">
                Lihat semua notifikasi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">AD</span>
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">Super Admin</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuItem>Bantuan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
