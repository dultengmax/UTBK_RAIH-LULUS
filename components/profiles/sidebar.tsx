// app/dashboard/components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Award, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Target,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BrandLogo } from '@/components/brand-logo';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: BookOpen, label: 'Tryout', href: '/dashboard/tryout' },
    { icon: Award, label: 'Achievements', href: '/dashboard/achievements' },
    { icon: Target, label: 'Target', href: '/dashboard/target' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
    { icon: LogOut, label: 'Logout', href: '/logout' },
  ];

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' },
    mobileOpen: { x: 0 },
    mobileClosed: { x: '-100%' }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-deep-navy/80 backdrop-blur-sm border border-white/10 text-white"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        className={`
          fixed top-0 left-0 h-full bg-deep-navy/95 backdrop-blur-xl 
          border-r border-white/10 z-50
          flex flex-col
          ${isMobileOpen ? 'block' : 'hidden lg:block'}
        `}
        style={{ 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(12px)'
        }}
      >
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-w-0"
          >
            <BrandLogo
              showName={!isCollapsed}
              subtitle={isCollapsed ? undefined : 'Dashboard siswa'}
              theme="light"
              size={isCollapsed ? 40 : 42}
              titleClassName="text-white"
              subtitleClassName="text-white/60"
              logoWrapperClassName="border-white/10"
            />
          </motion.div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex text-white/70 hover:text-white hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          <TooltipProvider delayDuration={0}>
            {menuItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center gap-4 px-4 py-3 rounded-lg
                        ${item.active 
                          ? 'bg-linear-to-r from-blue-500/20 to-indigo-500/20 text-white border-l-4 border-blue-500' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        }
                        transition-all duration-200
                      `}
                    >
                      <item.icon className="h-5 w-5 min-w-[20px]" />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-deep-navy text-white border-white/10">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        {/* Bottom Menu */}
        <div className="px-3 py-6 border-t border-white/10 space-y-1">
          <TooltipProvider delayDuration={0}>
            {bottomMenuItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <item.icon className="h-5 w-5 min-w-[20px]" />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-deep-navy text-white border-white/10">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
