'use client';

import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg 
        className={`animate-spin text-blue-600 dark:text-blue-400 ${sizeClasses[size]}`} 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

interface LoadingButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function LoadingButton({ 
  loading = false, 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading && (
        <LoadingSpinner size="sm" className="absolute" />
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
}

interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  text?: string;
}

export function LoadingOverlay({ loading, children, text = 'Đang tải...' }: LoadingOverlayProps) {
  if (!loading) return <>{children}</>;

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-2">
          <LoadingSpinner size="lg" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

interface PageLoadingProps {
  text?: string;
}

export function PageLoading({ text = 'Đang tải trang...' }: PageLoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[200px] lg:min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {text}{dots}
        </p>
      </div>
    </div>
  );
}