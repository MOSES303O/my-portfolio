'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');

      const hasAccess = isLoggedIn && userRole === 'admin';

      setIsAllowed(hasAccess);
      setIsLoading(false);

      // Optional: Auto redirect to login if not allowed
      if (!hasAccess) {
        router.replace('/login');   // replace = no back button history
      }
    };

    // Small delay for better UX (avoid flash)
    const timer = setTimeout(checkAccess, 400);

    return () => clearTimeout(timer);
  }, [router]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not Allowed (fallback in case redirect fails)
  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <div className="text-center max-w-md px-6">
          <h2 className="text-3xl font-bold text-red-400 mb-3">Access Denied</h2>
          <p className="text-gray-400 mb-8">
            You dont have permission to access this dashboard.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-200 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Allowed → Render children
  return <>{children}</>;
};

export default ProtectedRoute;