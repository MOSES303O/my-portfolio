'use client';

import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, Pin } from 'lucide-react';
import AOS from "aos";
import Image from 'next/image';
import "aos/dist/aos.css";

interface CommentType {
  id: number;
  user_name: string;
  content: string;
  profile_image?: string;
  created_at: string;
  is_pinned?: boolean;
}

// Mock Pinned Comment
const mockPinnedComment: CommentType = {
  id: 999,
  user_name: "Ochieng Moses",
  content: "Thank you for visiting my portfolio! Feel free to leave a comment and share your thoughts.",
  profile_image: "/ochi.jpg",
  created_at: new Date().toISOString(),
  is_pinned: true,
};

// Initial Mock Comments
const initialMockComments: CommentType[] = [
  {
    id: 1,
    user_name: "Alex Chen",
    content: "Amazing portfolio! The design and animations are really smooth 🔥",
    profile_image: "",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 2,
    user_name: "Sarah Williams",
    content: "Love the attention to detail. Keep up the great work!",
    profile_image: "",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

const Comment = memo(({ comment, formatDate, isPinned = false }: { 
  comment: CommentType; 
  formatDate: (date: string) => string; 
  isPinned?: boolean;
}) => (
  <div 
    className={`px-4 pt-4 pb-3 rounded-2xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 ${
      isPinned 
        ? 'bg-linear-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}
  >
    {isPinned && (
      <div className="flex items-center gap-2 mb-3 text-indigo-400">
        <Pin className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide">Pinned Comment</span>
      </div>
    )}

    <div className="flex items-start gap-3">
      {comment.profile_image ? (
        <Image
          src={comment.profile_image}
          alt={`${comment.user_name}'s profile`}
          width={40} // Set based on w-10 h-10 (40px)
          height={40}
          className={`rounded-full object-cover border-2 shrink-0 ${
            isPinned ? 'border-indigo-500/50' : 'border-white/20'
          }`}
          loading="lazy"
        />
      ) : (
        <div className={`p-2 rounded-full text-indigo-400 group-hover:bg-indigo-500/30 transition-colors ${
          isPinned ? 'bg-indigo-500/30' : 'bg-white/10'
        }`}>
          <UserCircle2 className="w-6 h-6" />
        </div>
      )}

      <div className="grow min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium ${isPinned ? 'text-indigo-200' : 'text-white'}`}>
              {comment.user_name}
            </h4>
            {isPinned && (
              <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">Admin</span>
            )}
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed wrap-break-words">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));
Comment.displayName = 'Comment';

const Komentar = () => {
  const [comments, setComments] = useState<CommentType[]>(initialMockComments);
  const [pinnedComment] = useState<CommentType>(mockPinnedComment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });
  }, []);

  const formatDate = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      let profileImageUrl = '';

      if (imageFile) {
        profileImageUrl = URL.createObjectURL(imageFile); // Simulate upload
      }

      const newEntry: CommentType = {
        id: Date.now(),
        user_name: userName.trim(),
        content: newComment.trim(),
        profile_image: profileImageUrl || undefined,
        created_at: new Date().toISOString(),
      };

      setComments(prev => [newEntry, ...prev]);

      // Reset form
      setNewComment('');
      setUserName('');
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (textareaRef.current) textareaRef.current.style.height = 'auto';

    } catch (err) {
      setError('Failed to post comment. Please try again:'+err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalComments = comments.length + (pinnedComment ? 1 : 0);

  return (
    <div className="w-full bg-linear-to-b from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Comments <span className="text-indigo-400">({totalComments})</span>
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={20}
              placeholder="Your name"
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Message <span className="text-red-400">*</span></label>
            <textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={280}
              placeholder="Write your thoughts..."
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-gray-400 min-h-110px resize-y"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">Profile Photo (optional)</label>
            <div className="p-4 bg-white/5 border border-dashed border-white/20 rounded-2xl">
              {imagePreview ? (
                <div className="flex items-center gap-4">
                  <Image src={imagePreview} alt="preview" className="w-16 h-16 rounded-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setImageFile(null); }}
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-6 flex flex-col items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-sm">Choose Profile Photo</span>
                  <p className="text-xs text-gray-500">Max 5MB</p>
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim() || !userName.trim()}
            className="w-full h-12 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4 max-h-380px overflow-y-auto custom-scrollbar pr-2">
          {pinnedComment && (
            <Comment comment={pinnedComment} formatDate={formatDate} isPinned />
          )}

          {comments.length === 0 && !pinnedComment ? (
            <div className="text-center py-12 text-gray-400">
              No comments yet. Be the first!
            </div>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} formatDate={formatDate} />
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.6); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Komentar;