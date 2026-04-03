// app/dashboard/components/TryoutHistory.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  MoreVertical,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Tryout } from '@/types/dashboard';

interface TryoutHistoryProps {
  data: Tryout[];
}

const TryoutHistory: React.FC<TryoutHistoryProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Tryout>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const itemsPerPage = 5;

  // Filter and sort data
  const filteredData = data
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortField === 'irtScore') {
        return sortDirection === 'asc' 
          ? a.irtScore - b.irtScore
          : b.irtScore - a.irtScore;
      }
      if (sortField === 'nationalRank') {
        return sortDirection === 'asc' 
          ? a.nationalRank - b.nationalRank
          : b.nationalRank - a.nationalRank;
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-emerald-400';
    if (score >= 650) return 'text-blue-400';
    if (score >= 550) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 1000) return 'text-emerald-400';
    if (rank <= 5000) return 'text-blue-400';
    if (rank <= 10000) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleSort = (field: keyof Tryout) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                Tryout History
              </CardTitle>
              <p className="text-sm text-white/70 mt-1">
                Riwayat tryout yang pernah diikuti
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Cari tryout..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-blue-500/50"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/5 border-white/10 hover:bg-white/10">
                  <TableHead 
                    className="text-white/70 cursor-pointer hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    Nama Tryout
                  </TableHead>
                  <TableHead 
                    className="text-white/70 cursor-pointer hover:text-white"
                    onClick={() => handleSort('date')}
                  >
                    Tanggal
                  </TableHead>
                  <TableHead 
                    className="text-white/70 cursor-pointer hover:text-white"
                    onClick={() => handleSort('irtScore')}
                  >
                    Skor IRT
                  </TableHead>
                  <TableHead 
                    className="text-white/70 cursor-pointer hover:text-white"
                    onClick={() => handleSort('nationalRank')}
                  >
                    Ranking Nasional
                  </TableHead>
                  <TableHead className="text-white/70">
                    % Benar
                  </TableHead>
                  <TableHead className="text-white/70 text-right">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((tryout) => (
                  <TableRow 
                    key={tryout.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-r from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                        </div>
                        {tryout.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/70">
                      {formatDate(tryout.date)}
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getScoreColor(tryout.irtScore)}`}>
                        {tryout.irtScore.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getRankColor(tryout.nationalRank)}`}>
                        #{formatNumber(tryout.nationalRank)}
                      </span>
                      <span className="text-white/50 text-xs ml-1">
                        / {formatNumber(tryout.totalParticipants)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                          {tryout.correctPercentage}%
                        </span>
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-linear-to-r from-emerald-500 to-teal-500"
                            style={{ width: `${tryout.correctPercentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end"
                          className="bg-deep-navy/95 backdrop-blur-xl border border-white/10 text-white"
                        >
                          <DropdownMenuItem 
                            onClick={() => window.location.href = tryout.detailsUrl}
                            className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                            <Download className="h-4 w-4 mr-2" />
                            Download Laporan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-white/50">
                      Tidak ada data tryout yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-white/70">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} dari{' '}
                {filteredData.length} data
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-50"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={i}
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`
                        border-white/10 hover:bg-white/10 text-white
                        ${currentPage === pageNum 
                          ? 'bg-linear-to-r from-blue-500 to-indigo-500 border-transparent' 
                          : 'bg-white/5'
                        }
                      `}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-50"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TryoutHistory;