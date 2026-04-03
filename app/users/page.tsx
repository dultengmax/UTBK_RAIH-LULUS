'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus, Trash2, Edit, Shield, AlertCircle } from 'lucide-react'

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@raihlulus.id',
      role: 'Admin',
      status: 'Aktif',
      joinDate: '2023-11-01',
      questionsCreated: 345,
      subscriptionStatus: 'Premium',
    },
    {
      id: 2,
      name: 'Editor User',
      email: 'editor@raihlulus.id',
      role: 'Editor',
      status: 'Aktif',
      joinDate: '2023-12-15',
      questionsCreated: 89,
      subscriptionStatus: 'Premium',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Pengguna',
      status: 'Aktif',
      joinDate: '2024-01-05',
      questionsCreated: 0,
      subscriptionStatus: 'Gratis',
    },
    {
      id: 4,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Pengguna',
      status: 'Aktif',
      joinDate: '2024-01-08',
      questionsCreated: 0,
      subscriptionStatus: 'Premium',
    },
    {
      id: 5,
      name: 'Inactive User',
      email: 'inactive@example.com',
      role: 'Pengguna',
      status: 'Nonaktif',
      joinDate: '2023-10-10',
      questionsCreated: 0,
      subscriptionStatus: 'Gratis',
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = roleFilter === 'all' || user.role === roleFilter
    return matchSearch && matchRole
  })

  const getStatusColor = (status: string) => {
    return status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getSubscriptionColor = (subscription: string) => {
    return subscription === 'Premium' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
  }

  const getRoleIcon = (role: string) => {
    return role === 'Admin' ? <Shield className="w-4 h-4" /> : null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main className="pt-20 md:pt-16 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen Pengguna</h1>
              <p className="text-muted-foreground">
                Kelola pengguna sistem dan kontrol akses.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Pengguna Baru
            </Button>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Total Pengguna</p>
              <p className="text-3xl font-bold text-foreground">{users.length}</p>
              <p className="text-xs text-muted-foreground mt-2">+2 minggu ini</p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Pengguna Aktif</p>
              <p className="text-3xl font-bold text-primary">{users.filter(u => u.status === 'Aktif').length}</p>
              <p className="text-xs text-muted-foreground mt-2">95% aktivitas</p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Pengguna Premium</p>
              <p className="text-3xl font-bold text-accent">{users.filter(u => u.subscriptionStatus === 'Premium').length}</p>
              <p className="text-xs text-muted-foreground mt-2">60% dari total</p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Editor</p>
              <p className="text-3xl font-bold text-secondary">{users.filter(u => u.role === 'Editor').length}</p>
              <p className="text-xs text-muted-foreground mt-2">Pembuat konten</p>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-card border-border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengguna atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Peran</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Pengguna">Pengguna</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                Reset Filter
              </Button>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/20 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nama</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Peran</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Langganan</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Bergabung</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-secondary/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-primary">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm font-medium text-foreground">{user.role}</span>
                          {getRoleIcon(user.role)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getSubscriptionColor(user.subscriptionStatus)}`}>
                          {user.subscriptionStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Tidak ada pengguna yang cocok dengan filter Anda.</p>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                  Reset Filter
                </Button>
              </div>
            )}
          </Card>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredUsers.length} dari {users.length} pengguna
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                  Sebelumnya
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">1</Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                  Berikutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
