
'use client';

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FrameContainerProps {
  children: ReactNode;
  className?: string;
}

export function FrameContainer({ children, className }: FrameContainerProps) {
  return (
    <div className={cn("container min-h-screen bg-bg", className)}>
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
}
