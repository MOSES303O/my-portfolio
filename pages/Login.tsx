'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock authentication (for demo)
    const isValid = email.includes('@') && password.length >= 4;

    if (isValid) {
      // Save login state for ProtectedRoute
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userEmail', email);

      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#030014]">
      <div className="w-full max-w-md">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700" />

          <div className="relative bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-300 text-xs font-medium">Admin Portal</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Sign in to manage your portfolio</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Email</label>
                <div className="flex items-center bg-white/8 border border-white/15 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition-all">
                  <Mail className="w-5 h-5 text-gray-500 ml-4" />
                  <input
                    type="email"
                    placeholder="admin@ekizr.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent px-4 py-3.5 text-white placeholder-gray-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Password</label>
                <div className="flex items-center bg-white/8 border border-white/15 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition-all">
                  <Lock className="w-5 h-5 text-gray-500 ml-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent px-4 py-3.5 text-white placeholder-gray-500 outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-4 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full h-12 mt-2 overflow-hidden rounded-2xl group/btn"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#6366f1] to-[#a855f7] group-hover/btn:brightness-110 transition-all" />
                <div className="relative flex items-center justify-center gap-3 h-full text-white font-medium">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <LogIn className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;