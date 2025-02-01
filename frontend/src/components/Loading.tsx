'use client';

import { useState, useEffect } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  isLoading?: boolean;
}

export default function Loading({ 
  size = 'md', 
  fullScreen = false, 
  text,
  isLoading = true
}: LoadingProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isLoading]);

  if (!showLoading) return null;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${
      fullScreen ? "fixed inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-50" : ""
    }`}>
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-100 ${
          sizeClasses[size]
        }`}
        style={{ animationDuration: '0.8s' }}
      />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );
}
