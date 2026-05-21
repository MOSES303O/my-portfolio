'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  FolderGit2, Award, MessageSquare, LogOut, 
  LayoutDashboard
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

    <nav className="flex flex-col gap-1 flex-1 min-h-0">
      <p className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-2">Menu</p>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const active = currentTab === id;
        return (
          <button
            key={id}
            onClick={() => onNavClick(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
              active
                ? 'bg-linear-to-r from-indigo-500/20 to-purple-500/15 border border-indigo-500/30 text-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : ''}`} />
            {label}
          </button>
        );
      })}
    </nav>

    <button
      onClick={onLogout}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams() as { tab?: string };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTab = (params.tab as string) || 'projects';

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
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <SidebarContent currentTab={currentTab} onNavClick={handleNavClick} onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r border-white/10 bg-[#0a0a1a] backdrop-blur-xl transition-transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent currentTab={currentTab} onNavClick={handleNavClick} onLogout={handleLogout} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {currentTab === 'projects' && <Projects />}
          {currentTab === 'certificates' && <Certificates />}
          {currentTab === 'comments' && <Comments />}
          {!['projects', 'certificates', 'comments'].includes(currentTab) && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a section from the menu
            </div>
          )}
        </main>
      </div>
    </div>
  );
}