'use client';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-full opacity-20 blur-2xl animate-pulse" />

        <div className="relative flex flex-col items-center gap-4 p-8">
          {/* Spinner */}
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#6366f1] animate-spin" />

          {/* Loading Text */}
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded blur opacity-20" />
            <span className="relative text-gray-200 text-sm font-medium tracking-wider">
              Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;