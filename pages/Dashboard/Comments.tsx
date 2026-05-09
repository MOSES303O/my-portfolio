'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MessageSquare, Pin, Trash2, PinOff, Calendar, Search, X, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import Image from 'next/image';

const PAGE_SIZE = 10;

interface Comment {
  id: number;
  user_name: string;
  content: string;
  profile_image?: string;
  created_at: string;
  is_pinned: boolean;
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500 pointer-events-none" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
);

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pinned'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Mock Data
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: 1,
        user_name: "Alex Chen",
        content: "This portfolio is absolutely stunning! The animations and design are top tier.",
        profile_image: "",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        is_pinned: true,
      },
      {
        id: 2,
        user_name: "Sarah Williams",
        content: "Really clean code and beautiful UI. Keep up the great work!",
        profile_image: "",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        is_pinned: false,
      },
      {
        id: 3,
        user_name: "Michael Rodriguez",
        content: "The project details page is very well designed. Love the smooth animations.",
        profile_image: "",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        is_pinned: false,
      },
    ];
    setComments(mockComments);
    setLoading(false);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const pinComment = (id: number, value: boolean) => {
    setComments(prev => 
      prev.map(c => c.id === id ? { ...c, is_pinned: value } : c)
    );
  };

  const deleteComment = (id: number) => {
    if (!confirm('Delete this comment?')) return;
    setComments(prev => prev.filter(c => c.id !== id));
  };

  // Filter + Search
  const filtered = useMemo(() => {
    let result = filter === 'pinned' 
      ? comments.filter(c => c.is_pinned) 
      : comments;

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(c => 
        c.user_name.toLowerCase().includes(q) || 
        c.content.toLowerCase().includes(q)
      );
    }
    return result;
  }, [comments, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pinnedCount = comments.filter(c => c.is_pinned).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
            <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Comments</h1>
            <p className="text-gray-500 text-xs">
              {comments.length} total • {pinnedCount} pinned
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {[
            { value: 'all', label: 'All', count: comments.length },
            { value: 'pinned', label: 'Pinned', count: pinnedCount },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as 'all' | 'pinned')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                filter === tab.value
                  ? 'bg-linear-to-r from-indigo-500/25 to-purple-500/20 border border-indigo-500/35 text-white font-medium'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === tab.value ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/10 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or message..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none focus:border-indigo-500 transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : paginated.length === 0 ? (
        <Card>
          <div className="p-20 text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No comments found.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {paginated.map((comment) => (
            <div key={comment.id} className="relative group">
              <div className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-5 transition-all ${
                comment.is_pinned ? 'border-indigo-500/30' : 'border-white/10 hover:border-white/20'
              }`}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 shrink-0 overflow-hidden">
                    {comment.profile_image ? (
                      <Image src={comment.profile_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400">
                        👤
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{comment.user_name}</span>
                        {comment.is_pinned && (
                          <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full flex items-center gap-1">
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(comment.created_at)}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => pinComment(comment.id, !comment.is_pinned)}
                      className={`p-2 rounded-lg transition-colors ${comment.is_pinned ? 'text-indigo-400' : 'text-gray-500 hover:text-indigo-400'}`}
                    >
                      {comment.is_pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1} – {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>

          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm ${page === p ? 'bg-indigo-500 text-white' : 'border border-white/10 text-gray-400 hover:text-white'}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}