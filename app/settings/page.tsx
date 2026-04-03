'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bell, Lock, Palette, Users, Database, Save } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    siteName: 'raihlulus',
    siteUrl: 'https://raihlulus.id',
    adminEmail: 'admin@raihlulus.id',
    timezone: 'Asia/Jakarta',
    language: 'id',
    enableRegistration: true,
    enablePublicQuestions: false,
  })

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const tabs = [
    { id: 'general', label: 'Umum', icon: Database },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'appearance', label: 'Tampilan', icon: Palette },
    { id: 'users', label: 'Manajemen Pengguna', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main className="pt-20 md:pt-16 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Pengaturan</h1>
            <p className="text-muted-foreground">
              Kelola konfigurasi sistem, keamanan, dan preferensi platform.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Pengaturan Umum</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nama Situs</label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">URL Situs</label>
                  <Input
                    value={settings.siteUrl}
                    onChange={(e) => handleChange('siteUrl', e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Admin</label>
                  <Input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleChange('adminEmail', e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Zona Waktu</label>
                    <Select value={settings.timezone} onValueChange={(value) => handleChange('timezone', value)}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Jakarta">Jakarta (UTC+7)</SelectItem>
                        <SelectItem value="Asia/Bangkok">Bangkok (UTC+7)</SelectItem>
                        <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Hong_Kong">Hong Kong (UTC+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bahasa</label>
                    <Select value={settings.language} onValueChange={(value) => handleChange('language', value)}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-bold text-foreground mb-4">Opsi Pendaftaran</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableRegistration}
                        onChange={(e) => handleChange('enableRegistration', e.target.checked)}
                        className="w-5 h-5 rounded border-border"
                      />
                      <span className="text-sm text-foreground">Izinkan pendaftaran pengguna baru</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enablePublicQuestions}
                        onChange={(e) => handleChange('enablePublicQuestions', e.target.checked)}
                        className="w-5 h-5 rounded border-border"
                      />
                      <span className="text-sm text-foreground">Buat soal dapat diakses publik</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                    Batal
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Pengaturan Keamanan</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Password Admin</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ubah password admin untuk meningkatkan keamanan sistem.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Password Saat Ini</label>
                      <Input type="password" placeholder="••••••••" className="bg-background border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Password Baru</label>
                      <Input type="password" placeholder="••••••••" className="bg-background border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Konfirmasi Password</label>
                      <Input type="password" placeholder="••••••••" className="bg-background border-border text-foreground" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Autentikasi Dua Faktor</h3>
                  <p className="text-sm text-muted-foreground mb-4">Tingkatkan keamanan dengan mengaktifkan 2FA.</p>
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                    Aktifkan 2FA
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Sesi Aktif</h3>
                  <p className="text-sm text-muted-foreground mb-4">Kelola sesi yang saat ini aktif.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">Sesi Saat Ini</p>
                        <p className="text-xs text-muted-foreground">Jakarta • 192.168.1.1</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800">Aktif</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Pengaturan Notifikasi</h2>
              <div className="space-y-4">
                {[
                  { label: 'Soal Baru Ditambahkan', description: 'Notifikasi ketika soal baru ditambahkan' },
                  { label: 'Pengguna Baru Terdaftar', description: 'Notifikasi saat ada pengguna baru' },
                  { label: 'Laporan Masalah', description: 'Notifikasi untuk laporan soal yang bermasalah' },
                  { label: 'Update Sistem', description: 'Notifikasi untuk update sistem penting' },
                ].map((notification, index) => (
                  <label key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/10">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{notification.label}</p>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-6 border-t border-border mt-6">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Pengaturan Tampilan</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-4">Tema</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Terang' },
                      { id: 'dark', label: 'Gelap' },
                      { id: 'auto', label: 'Otomatis' },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        className="p-4 border-2 rounded-lg transition-all hover:border-primary"
                      >
                        <div className="w-full h-24 rounded bg-secondary/20 mb-2" />
                        <p className="text-sm font-medium text-foreground">{theme.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-bold text-foreground mb-4">Warna Aksen</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      { name: 'Biru', color: 'bg-blue-500' },
                      { name: 'Ungu', color: 'bg-purple-500' },
                      { name: 'Merah', color: 'bg-red-500' },
                      { name: 'Hijau', color: 'bg-green-500' },
                      { name: 'Oranye', color: 'bg-orange-500' },
                      { name: 'Pink', color: 'bg-pink-500' },
                    ].map((accent) => (
                      <button
                        key={accent.name}
                        className={`w-full h-12 rounded-lg ${accent.color} hover:opacity-80 transition-opacity`}
                        title={accent.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* User Management Settings */}
          {activeTab === 'users' && (
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Manajemen Pengguna</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Peran Default</h3>
                  <Select defaultValue="pengguna">
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pengguna">Pengguna Biasa</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">Peran yang diberikan kepada pengguna baru saat pendaftaran.</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Limit Pertanyaan</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Soal per Bulan (Pengguna Gratis)</label>
                      <Input type="number" defaultValue={10} className="bg-background border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Soal per Bulan (Pengguna Premium)</label>
                      <Input type="number" defaultValue={100} className="bg-background border-border text-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
