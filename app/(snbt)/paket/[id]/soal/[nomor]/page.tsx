"use client"
import { memo, useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Clock, Flag, 
  LayoutGrid, Send, Menu, AlertCircle, 
  Bookmark, CheckCircle, Circle,
  Maximize2, Minimize2, Volume2, VolumeX,
  ChevronUp, ChevronDown, SkipForward,
  BarChart3, BookOpen, ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/brand-logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  explanation?: string;
}

interface QuestionStatus {
  number: number;
  status: 'answered' | 'unanswered' | 'marked' | 'current';
}

type QuestionFilter = 'all' | 'answered' | 'marked' | 'unanswered';

interface ExamData {
  id: number;
  question: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  options: QuestionOption[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeSpent?: number;
}

interface MobileNavSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  totalSoal: number;
  timeLeftLabel: string;
  activeTab: QuestionFilter;
  onActiveTabChange: (value: QuestionFilter) => void;
  questionStatuses: QuestionStatus[];
  onGoToQuestion: (questionNumber: number) => void;
  averageTimePerQuestion: number;
  formatTimeSpent: (seconds: number) => string;
  answeredCount: number;
  onJumpToUnanswered: () => void;
  onJumpToMarked: () => void;
}

const MobileNavSheet = memo(function MobileNavSheet({
  isOpen,
  onOpenChange,
  totalSoal,
  timeLeftLabel,
  activeTab,
  onActiveTabChange,
  questionStatuses,
  onGoToQuestion,
  averageTimePerQuestion,
  formatTimeSpent,
  answeredCount,
  onJumpToUnanswered,
  onJumpToMarked,
}: MobileNavSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[90vh] border-gray-800 bg-linear-to-b from-gray-900 to-gray-950 px-0 text-white lg:hidden"
      >
        <SheetHeader className="border-b border-gray-800 px-6 pb-4 text-left">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold text-white">
            <LayoutGrid size={20} className="text-blue-400" />
            Navigasi Soal
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-400">
            {totalSoal} soal - {timeLeftLabel} tersisa
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 overflow-hidden px-6 pb-8">
          <Tabs
            value={activeTab}
            onValueChange={(value) => onActiveTabChange(value as QuestionFilter)}
            className="pt-4"
          >
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/80">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Semua
              </TabsTrigger>
              <TabsTrigger value="answered" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Terjawab
              </TabsTrigger>
              <TabsTrigger value="marked" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Tandai
              </TabsTrigger>
              <TabsTrigger value="unanswered" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Belum
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="mt-4 h-64 rounded-2xl border border-gray-800 bg-gray-900/70 p-3">
              <div className="grid grid-cols-5 gap-2 pr-1">
                {questionStatuses
                  .filter((q) => {
                    if (activeTab === 'all') return true;
                    if (activeTab === 'answered') return q.status === 'answered';
                    if (activeTab === 'marked') return q.status === 'marked';
                    if (activeTab === 'unanswered') return q.status === 'unanswered';
                    return true;
                  })
                  .map(({ number, status }) => (
                    <button
                      key={number}
                      onClick={() => onGoToQuestion(number)}
                      className={`
                        relative flex h-12 items-center justify-center rounded-xl border text-sm font-bold transition-all active:scale-95
                        ${status === 'current'
                          ? 'bg-linear-to-br from-blue-600 to-blue-500 border-blue-400 text-white shadow-lg'
                          : status === 'answered'
                          ? 'bg-linear-to-br from-green-600/20 to-green-600/10 border-green-500/30 text-green-400 hover:border-green-500/50'
                          : status === 'marked'
                          ? 'bg-linear-to-br from-yellow-600/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400 hover:border-yellow-500/50'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
                        }
                      `}
                    >
                      {number}
                      {status === 'marked' && (
                        <Flag size={10} className="absolute -top-1 -right-1 text-yellow-500" />
                      )}
                      {status === 'answered' && (
                        <CheckCircle size={10} className="absolute -top-1 -right-1 text-green-500" />
                      )}
                    </button>
                  ))}
              </div>
            </ScrollArea>
          </Tabs>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-gray-800 bg-gray-900/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Waktu Rata-rata</p>
                    <p className="text-lg font-bold text-white">{formatTimeSpent(averageTimePerQuestion)}</p>
                  </div>
                  <Clock className="text-blue-400" size={20} />
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-900/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Progress</p>
                    <p className="text-lg font-bold text-white">{Math.round((answeredCount / totalSoal) * 100)}%</p>
                  </div>
                  <BarChart3 className="text-green-400" size={20} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onJumpToUnanswered}
              className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            >
              <SkipForward size={16} className="mr-2" />
              Loncat ke Belum
            </Button>
            <Button
              variant="outline"
              onClick={onJumpToMarked}
              className="border-yellow-600/30 bg-yellow-600/10 text-yellow-400 hover:bg-yellow-600/20"
            >
              <Flag size={16} className="mr-2" />
              Loncat ke Tandai
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

const clampQuestionNumber = (value: number, totalSoal: number) => {
  if (Number.isNaN(value)) return 1;
  return Math.min(totalSoal, Math.max(1, value));
};

const getRouteParam = (value: string | string[] | undefined, fallback: string) => {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value) && value[0]?.trim()) return value[0];
  return fallback;
};

const ExamPage = () => {
  const params = useParams<{ id?: string | string[]; nomor?: string | string[] }>();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    1: "A",
    3: "C",
    6: "B",
    9: "E",
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6125); // 1:42:05 in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set([5, 10, 15]));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState<Record<number, number>>({});
  const [activeTab, setActiveTab] = useState<QuestionFilter>('all');
  const [isExamPaused, setIsExamPaused] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  
  const totalSoal = 20;
  const paketId = getRouteParam(params.id, "1");
  const routeQuestionNumber = clampQuestionNumber(
    Number.parseInt(getRouteParam(params.nomor, "1"), 10),
    totalSoal,
  );
  const [currentNo, setCurrentNo] = useState(routeQuestionNumber);
  const selectedOption = selectedAnswers[currentNo] ?? null;
  const answeredQuestions = useMemo(
    () => new Set(Object.keys(selectedAnswers).map((value) => Number.parseInt(value, 10))),
    [selectedAnswers],
  );

  // Mock exam data
  const examData: ExamData = {
    id: currentNo,
    question: "Berdasarkan paragraf ke-2, manakah pernyataan yang paling mungkin benar mengenai implementasi kurikulum merdeka di sekolah menengah atas?",
    imageUrl: currentNo % 3 === 0 ? "/placeholder.jpg" : undefined,
    imageAlt: currentNo % 3 === 0 ? `Ilustrasi pendukung soal nomor ${currentNo}` : undefined,
    imageCaption: currentNo % 3 === 0 ? "Gambar pendukung soal ditampilkan di bawah pertanyaan." : undefined,
    options: [
      { 
        id: 'A', 
        text: 'Meningkatkan produktivitas belajar siswa', 
        isCorrect: true,
        explanation: 'Kurikulum merdeka fokus pada pembelajaran yang bermakna dan relevan bagi siswa.'
      },
      { 
        id: 'B', 
        text: 'Menurunkan standar kelulusan nasional',
        explanation: 'Tidak ada hubungan langsung dengan penurunan standar.'
      },
      { 
        id: 'C', 
        text: 'Mengubah struktur kurikulum secara menyeluruh',
        explanation: 'Perubahan lebih pada pendekatan, bukan struktur total.'
      },
      { 
        id: 'D', 
        text: 'Menghapus sistem penilaian berbasis kompetensi',
        explanation: 'Justru memperkuat penilaian berbasis kompetensi.'
      },
      { 
        id: 'E', 
        text: 'Menambah beban administrasi guru',
        explanation: 'Bertujuan mengurangi beban administratif.'
      },
    ],
    explanation: "Kurikulum merdeka dirancang untuk memberikan fleksibilitas kepada sekolah dan guru dalam mengembangkan pembelajaran yang sesuai dengan kebutuhan siswa, sehingga dapat meningkatkan produktivitas belajar. Pendekatan ini menekankan pada pengembangan karakter dan kompetensi yang relevan dengan perkembangan zaman.",
    difficulty: 'medium',
    category: 'Literasi Membaca'
  };
  const resolvedImageUrl = examData.imageUrl && !imageLoadFailed ? examData.imageUrl : examData.imageUrl ? "/placeholder.jpg" : undefined;

  useEffect(() => {
    setImageLoadFailed(false);
  }, [currentNo, examData.imageUrl]);

  useEffect(() => {
    setCurrentNo(routeQuestionNumber);
  }, [routeQuestionNumber]);

  const updateQuestionUrl = useCallback((questionNumber: number) => {
    if (typeof window === "undefined") return;

    const targetUrl = `/paket/${paketId}/soal/${questionNumber}`;

    if (window.location.pathname === targetUrl) return;

    window.history.replaceState(window.history.state, "", targetUrl);
  }, [paketId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const nextQuestionNumber = clampQuestionNumber(
        Number.parseInt(pathSegments[pathSegments.length - 1] ?? "1", 10),
        totalSoal,
      );

      setCurrentNo(nextQuestionNumber);
      setIsNavOpen(false);
      setShowExplanation(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [totalSoal]);

  // Calculate time per question
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExamPaused) {
        setTimePerQuestion(prev => ({
          ...prev,
          [currentNo]: (prev[currentNo] || 0) + 1
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentNo, isExamPaused]);

  // Generate question status data
  const questionStatuses: QuestionStatus[] = Array.from({ length: totalSoal }, (_, i) => {
    const num = i + 1;
    let status: QuestionStatus['status'] = 'unanswered';
    
    if (num === currentNo) {
      status = 'current';
    } else if (answeredQuestions.has(num)) {
      status = 'answered';
    } else if (markedQuestions.has(num)) {
      status = 'marked';
    }
    
    return { number: num, status };
  });

  // Format time
  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Get mobile time format
  const getMobileTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Timer effect
  useEffect(() => {
    if (isExamPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamPaused]);

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentNo]: optionId,
    }));
    
    // Play sound if enabled
    if (isSoundEnabled) {
      const audio = new Audio('/sounds/click.mp3');
      audio.play().catch(() => {});
    }
  };

  // Toggle mark question
  const toggleMarkQuestion = () => {
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentNo)) {
        newSet.delete(currentNo);
      } else {
        newSet.add(currentNo);
      }
      return newSet;
    });
  };

  // Navigation functions
  const openNavDrawer = useCallback(() => {
    if (isNavOpen) return;
    setIsNavOpen(true);
  }, [isNavOpen]);

  const closeNavDrawer = useCallback(() => {
    if (!isNavOpen) return;
    setIsNavOpen(false);
  }, [isNavOpen]);

  const goToQuestion = (questionNumber: number) => {
    const nextQuestionNumber = clampQuestionNumber(questionNumber, totalSoal);

    if (nextQuestionNumber === currentNo) {
      closeNavDrawer();
      return;
    }

    setCurrentNo(nextQuestionNumber);
    updateQuestionUrl(nextQuestionNumber);
    closeNavDrawer();
    setShowExplanation(false);
  };

  const goToNextQuestion = () => {
    if (currentNo < totalSoal) {
      goToQuestion(currentNo + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentNo > 1) {
      goToQuestion(currentNo - 1);
    }
  };

  const jumpToQuestion = (type: 'unanswered' | 'marked' | 'next' | 'previous') => {
    switch (type) {
      case 'unanswered':
        const unanswered = questionStatuses.find(q => q.status === 'unanswered');
        if (unanswered) goToQuestion(unanswered.number);
        break;
      case 'marked':
        const marked = questionStatuses.find(q => q.status === 'marked');
        if (marked) goToQuestion(marked.number);
        break;
      case 'next':
        goToNextQuestion();
        break;
      case 'previous':
        goToPreviousQuestion();
        break;
    }
  };

  // Count answered and marked questions
  const answeredCount = answeredQuestions.size;
  const markedCount = markedQuestions.size;
  const unansweredCount = totalSoal - answeredCount;

  // Calculate average time per question
  const totalTimeSpent = Object.values(timePerQuestion).reduce((a, b) => a + b, 0);
  const averageTimePerQuestion = answeredCount > 0 ? Math.round(totalTimeSpent / answeredCount) : 0;

  // Format time spent
  const formatTimeSpent = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto submit when time's up
  const handleAutoSubmit = () => {
    setShowSubmitConfirm(true);
  };

  // Handle submit
  const handleSubmit = () => {
    console.log('Submitting exam...');
    setIsExamPaused(true);
    setShowSubmitConfirm(false);
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty: ExamData['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400';
      case 'medium': return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400';
      case 'hard': return 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400';
    }
  };

  // Settings Dialog
  const SettingsDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <BookOpen size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogTitle className="text-lg font-bold">Pengaturan Ujian</DialogTitle>
        <DialogDescription className="text-gray-400">
          Sesuaikan pengalaman ujian Anda
        </DialogDescription>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Suara Notifikasi</Label>
              <p className="text-sm text-gray-400">Bunyi saat memilih jawaban</p>
            </div>
            <Switch 
              checked={isSoundEnabled}
              onCheckedChange={setIsSoundEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Mode Fullscreen</Label>
              <p className="text-sm text-gray-400">Tampilkan layar penuh</p>
            </div>
            <Switch 
              checked={isFullscreen}
              onCheckedChange={setIsFullscreen}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Jeda Ujian</Label>
              <p className="text-sm text-gray-400">Hentikan timer sementara</p>
            </div>
            <Switch 
              checked={isExamPaused}
              onCheckedChange={setIsExamPaused}
            />
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            <h4 className="font-bold mb-2">Statistik Ujian</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Waktu Tersisa</p>
                <p className="text-xl font-bold text-blue-400">{formatTime(timeLeft)}</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Soal Dikerjakan</p>
                <p className="text-xl font-bold text-green-400">{answeredCount}/{totalSoal}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={`min-h-screen bg-linear-to-b from-gray-950 to-gray-900 text-white flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            <button 
              onClick={openNavDrawer}
              disabled={isNavOpen}
              className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden md:flex items-center gap-3">
              <BrandLogo
                theme="light"
                subtitle="Simulasi ujian"
                size={40}
                titleClassName="text-white"
                subtitleClassName="text-white/60"
                logoWrapperClassName="border-white/10"
              />
              <div className="h-10 w-px bg-gray-800" />
              <div>
                <h1 className="font-bold text-base tracking-tight">
                  Tryout SNBT #1
                </h1>
                <p className="text-sm text-gray-400">{examData.category}</p>
              </div>
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <BrandLogo
                href=""
                theme="light"
                showName={false}
                size={36}
                logoWrapperClassName="border-white/10"
              />
              <div>
                <p className="text-sm font-bold">Soal {currentNo}</p>
                <p className="text-xs text-gray-400">{formatTimeSpent(timePerQuestion[currentNo] || 0)}</p>
              </div>
            </div>
          </div>

          {/* Center section - Timer */}
          <div className="flex-1 max-w-xs mx-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                <Clock size={18} className="text-blue-400" />
                <span className="font-mono font-bold text-blue-400">
                  <span className="md:hidden">{getMobileTime(timeLeft)}</span>
                  <span className="hidden md:inline">{formatTime(timeLeft)}</span>
                </span>
                {isExamPaused && (
                  <Badge variant="outline" className="ml-2 bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs">
                    Dijeda
                  </Badge>
                )}
              </div>
              <Progress 
                value={(timeLeft / 6125) * 100} 
                className="w-full mt-2 h-1.5 bg-gray-800" 
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <SettingsDialog />
            
            <Dialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
              <DialogTrigger asChild>
                <Button 
                  variant="destructive"
                  size="sm"
                  className="font-bold rounded-lg px-4 flex items-center gap-2 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                >
                  <span className="hidden md:inline">Kumpulkan</span>
                  <Send size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-red-500/20 p-3 rounded-full">
                      <AlertCircle className="text-red-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Konfirmasi Pengumpulan</h3>
                      <p className="text-gray-400 text-sm">
                        {answeredCount} dari {totalSoal} soal terjawab
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-800 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-500">{answeredCount}</div>
                      <div className="text-xs text-gray-400">Terjawab</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-500">{markedCount}</div>
                      <div className="text-xs text-gray-400">Ditandai</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-500">{unansweredCount}</div>
                      <div className="text-xs text-gray-400">Belum</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowSubmitConfirm(false)}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      Lanjutkan
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleSubmit}
                      className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                    >
                      Ya, Kumpulkan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          {/* Question header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-linear-to-r from-blue-600 to-blue-500 border-blue-400 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                Soal {currentNo}
              </Badge>
              <Badge className={`${getDifficultyColor(examData.difficulty)}`}>
                {examData.difficulty}
              </Badge>
              <span className="text-sm text-gray-400 hidden md:inline">
                {formatTimeSpent(timePerQuestion[currentNo] || 0)} - {examData.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Question text */}
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed text-gray-200">
                      {examData.question}
                    </p>
                    
                    {resolvedImageUrl && (
                      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/80">
                        <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-gray-300">
                          <ImageIcon size={16} className="text-blue-400" />
                          <span>Gambar pendukung soal</span>
                        </div>
                        <div className="bg-gray-950 p-4">
                          <img
                            src={resolvedImageUrl}
                            alt={examData.imageAlt ?? `Gambar soal nomor ${currentNo}`}
                            loading="lazy"
                            onError={() => {
                              if (!imageLoadFailed) {
                                setImageLoadFailed(true);
                              }
                            }}
                            className="max-h-112 w-full rounded-xl border border-gray-800 bg-white/5 object-contain"
                          />
                          {(examData.imageCaption || imageLoadFailed) && (
                            <div className="mt-3 space-y-1 text-sm text-gray-400">
                              {examData.imageCaption && <p>{examData.imageCaption}</p>}
                              {imageLoadFailed && (
                                <p>Gambar asli tidak dapat dimuat, sehingga ditampilkan gambar cadangan.</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Options */}
              <div className="space-y-3">
                {examData.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all transform active:scale-[0.98]
                      ${selectedOption === opt.id
                        ? 'bg-linear-to-r from-blue-600/20 to-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                        : 'bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold
                        ${selectedOption === opt.id
                          ? 'bg-linear-to-br from-blue-600 to-blue-500 text-white'
                          : 'bg-gray-800 text-gray-400'
                        }
                      `}>
                        {opt.id}
                      </div>
                      <div className="flex-1">
                        <p className={`${selectedOption === opt.id ? 'text-white font-medium' : 'text-gray-300'}`}>
                          {opt.text}
                        </p>
                      </div>
                      {selectedOption === opt.id && (
                        <CheckCircle className="text-green-500 shrink-0" size={20} />
                      )}
                    </div>
                    
                    {/* Option explanation */}
                    {selectedOption === opt.id && opt.explanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-gray-800"
                      >
                        <p className="text-sm text-gray-400">{opt.explanation}</p>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              {/* Explanation panel */}
              {selectedOption && examData.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-linear-to-r from-purple-600/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bookmark size={18} className="text-purple-500" />
                      <h4 className="font-bold text-purple-400">Pembahasan</h4>
                    </div>
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      {showExplanation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                  
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2"
                    >
                      <p className="text-gray-300">{examData.explanation}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="sticky bottom-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousQuestion}
              disabled={currentNo === 1}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <ChevronLeft size={18} />
              <span className="hidden md:inline ml-2">Sebelumnya</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMarkQuestion}
              className={`${
                markedQuestions.has(currentNo)
                  ? 'bg-linear-to-r from-yellow-600 to-yellow-500 border-yellow-500 text-white'
                  : 'bg-yellow-600/10 border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/20'
              }`}
            >
              <Flag size={16} />
              <span className="hidden md:inline ml-2">
                {markedQuestions.has(currentNo) ? 'Batal Tandai' : 'Tandai'}
              </span>
            </Button>
          </div>

          {/* Mobile stats */}
          <div className="md:hidden flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-400">Sisa</div>
              <div className="text-sm font-bold">{unansweredCount}</div>
            </div>
            <Progress 
              value={(answeredCount / totalSoal) * 100} 
              className="w-24 h-2 bg-gray-800" 
            />
            <div className="text-center">
              <div className="text-xs text-gray-400">Total</div>
              <div className="text-sm font-bold">{totalSoal}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={goToNextQuestion}
              disabled={currentNo === totalSoal}
              className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            >
              <span className="hidden md:inline">Selanjutnya</span>
              <ChevronRight size={18} className="md:ml-2" />
            </Button>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Drawer */}
      <MobileNavSheet
        isOpen={isNavOpen}
        onOpenChange={setIsNavOpen}
        totalSoal={totalSoal}
        timeLeftLabel={formatTime(timeLeft)}
        activeTab={activeTab}
        onActiveTabChange={setActiveTab}
        questionStatuses={questionStatuses}
        onGoToQuestion={goToQuestion}
        averageTimePerQuestion={averageTimePerQuestion}
        formatTimeSpent={formatTimeSpent}
        answeredCount={answeredCount}
        onJumpToUnanswered={() => jumpToQuestion('unanswered')}
        onJumpToMarked={() => jumpToQuestion('marked')}
      />

      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-20 lg:hidden flex flex-col gap-2 z-40">
        <button
          onClick={() => jumpToQuestion('unanswered')}
          disabled={unansweredCount === 0}
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 ${
            unansweredCount > 0
              ? 'bg-linear-to-br from-red-600/20 to-red-500/10 border border-red-500/30 hover:border-red-500/50'
              : 'bg-gray-800 border-gray-700 opacity-50'
          }`}
        >
          <Circle size={22} className={unansweredCount > 0 ? "text-red-400" : "text-gray-500"} />
        </button>
        
        <button
          onClick={toggleMarkQuestion}
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 ${
            markedQuestions.has(currentNo)
              ? 'bg-linear-to-br from-yellow-600 to-yellow-500 border-yellow-500'
              : 'bg-linear-to-br from-yellow-600/20 to-yellow-500/10 border border-yellow-500/30 hover:border-yellow-500/50'
          }`}
        >
          <Flag size={22} fill={markedQuestions.has(currentNo) ? "white" : "transparent"} />
        </button>
        
        <button
          onClick={openNavDrawer}
          disabled={isNavOpen}
          className="p-3 rounded-full bg-linear-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-md shadow-lg"
        >
          <LayoutGrid size={22} className="text-blue-400" />
        </button>
      </div>

      {/* Low time warning */}
      {timeLeft <= 300 && timeLeft > 0 && !isExamPaused && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-24 right-4 z-50 w-64"
        >
          <div className="bg-linear-to-r from-red-600/20 to-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-md shadow-lg">
            <div className="flex items-start gap-3">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <AlertCircle size={20} className="text-red-500" />
              </div>
              <div>
                <h4 className="font-bold text-red-400 text-sm mb-1">Waktu Tersisa Sedikit!</h4>
                <p className="text-xs text-gray-300">{formatTime(timeLeft)} lagi</p>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setShowSubmitConfirm(true)}
                  className="mt-3 w-full h-8 text-xs"
                >
                  Kumpulkan Sekarang
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExamPage;
