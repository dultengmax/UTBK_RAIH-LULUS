// app/dashboard/components/types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    targetUniversity: string;
    targetMajor: string;
    irtScore: number;
    nationalRank: number;
    totalParticipants: number;
    acceptanceProbability: number;
    streak: number;
  }
  
  export interface MonthlyStat {
    month: string;
    monthShort: string;
    irtScore: number;
    rank: number;
    totalParticipants: number;
  }
  
  export interface Subtest {
    id: string;
    name: string;
    category: 'Literasi' | 'Penalaran' | 'Kuantitatif' | 'Verbal';
    score: number;
    maxScore: number;
    strength: 'weak' | 'average' | 'strong';
    recommendations: string[];
  }
  
  export interface Tryout {
    id: string;
    name: string;
    date: string;
    irtScore: number;
    nationalRank: number;
    totalParticipants: number;
    correctPercentage: number;
    detailsUrl: string;
  }
  
  export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlocked: boolean;
    unlockedDate?: string;
  }
  
  export interface NextTryout {
    id: string;
    name: string;
    date: string;
    timeRemaining: {
      days: number;
      hours: number;
      minutes: number;
    };
  }