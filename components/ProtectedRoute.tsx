'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // === MOCK AUTH LOGIC ===
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');

      // For demo purposes - you can change this to test
      const hasAdminAccess = isLoggedIn && userRole === 'admin';

      setAllowed(hasAdminAccess);
    };

    checkAccess();
  }, []);

  // Still loading
  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400">Checking access...</p>
        </div>
      </div>
    );
  }

  // Not allowed → Redirect to login
  if (!allowed) {
    // You can also use router.replace('/login') for client-side redirect
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">You dont have permission to view this page.</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Allowed → Show protected content
  return <>{children}</>;
};

export default ProtectedRoute;