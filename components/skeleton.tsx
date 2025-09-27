'use client';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

// Specific skeleton components for common use cases
export function SkeletonText({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <SkeletonText lines={2} className="mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4, className = "" }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }, (_, i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
      </div>
      
      {/* Table Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="px-6 py-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {Array.from({ length: cols }, (_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonStats({ count = 4, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-${count} gap-3 lg:gap-6 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}