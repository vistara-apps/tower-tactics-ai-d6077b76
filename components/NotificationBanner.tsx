
'use client';

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NotificationBannerProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning';
  onClose?: () => void;
}

export function NotificationBanner({ 
  children, 
  variant = 'info', 
  onClose 
}: NotificationBannerProps) {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  return (
    <div className={cn(
      "p-4 rounded-md border animate-slide-up",
      variants[variant]
    )}>
      <div className="flex items-center justify-between">
        <div className="text-sm">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current hover:opacity-70"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
