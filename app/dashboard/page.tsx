'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  FolderGit2, Award, MessageSquare, LogOut, 
  LayoutDashboard, Menu 
} from 'lucide-react';

import Projects from '@/pages/dashboard/Projects';
import Certificates from '@/pages/dashboard/Certificates';
import Comments from '@/pages/dashboard/Comments';

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
];

const SidebarContent = ({ 
  currentTab, 
  onNavClick, 
  onLogout 
}: { 
  currentTab: string; 
  onNavClick: (id: string) => void; 
  onLogout: () => void;
}) => (
  <div className="flex flex-col h-full p-5 gap-6">
    {/* Logo */}
    <div className="flex items-center gap-3 px-1 shrink-0">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
        <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-white">Dashboard</p>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>
    </div>

    {/* Badge */}
    <div className="shrink-0 px-3 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
      <span className="text-indigo-300 text-xs font-medium">Portfolio Manager</span>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-1 flex-1 min-h-0">
      <p className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-2 shrink-0">Menu</p>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const active = currentTab === id;
        return (
          <button
            key={id}
            onClick={() => onNavClick(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium shrink-0 ${
              active
                ? 'bg-linear-to-r from-indigo-500/20 to-purple-500/15 border border-indigo-500/30 text-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : ''}`} />
            {label}
            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
          </button>
        );
      })}
    </nav>

    {/* Logout */}
    <button
      onClick={onLogout}
      className="shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/15 transition-all duration-200 text-sm"
    >
      <LogOut className="w-4 h-4 shrink-0" />
      Sign Out
    </button>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname() || '';   // ← Fixed: Added fallback
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get current tab from URL
  const currentTab = pathname.split('/').pop() || 'projects';

  const handleNavClick = useCallback((id: string) => {
    router.push(`/dashboard/${id}`);
    setSidebarOpen(false);
  }, [router]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    router.push('/login');
  }, [router]);

  return (
    <div className="flex h-screen bg-[#030014] text-white overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <SidebarContent 
          currentTab={currentTab} 
          onNavClick={handleNavClick} 
          onLogout={handleLogout} 
        />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r border-white/10 bg-[#0a0a1a] backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent 
          currentTab={currentTab} 
          onNavClick={handleNavClick} 
          onLogout={handleLogout} 
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-xl shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-medium">Dashboard</span>
          <div className="w-9" />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {currentTab === 'projects' && <Projects />}
          {currentTab === 'certificates' && <Certificates />}
          {currentTab === 'comments' && <Comments />}
          {!['projects', 'certificates', 'comments'].includes(currentTab) && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <LayoutDashboard className="w-12 h-12 mb-4 opacity-30" />
              <p>Select a section from the menu</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}