'use client';

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-hover-lift",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primaryHover shadow-button hover:shadow-buttonHover active:scale-95",
        secondary: "bg-surface text-textPrimary hover:bg-surfaceHover border border-border hover:border-borderHover shadow-button hover:shadow-buttonHover",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white shadow-button hover:shadow-buttonHover active:scale-95",
        ghost: "hover:bg-surface hover:text-textPrimary active:scale-95",
        destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-button hover:shadow-buttonHover active:scale-95",
        premium: "bg-gradient-to-r from-premium to-accent text-white hover:from-premium/90 hover:to-accent/90 shadow-premium active:scale-95",
      },
      size: {
        sm: "h-8 px-3 text-xs min-w-[2rem]",
        md: "h-10 px-4 py-2 text-sm min-w-[2.5rem]",
        lg: "h-12 px-8 text-base min-w-[3rem]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  children,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="loading-spinner mr-2" />
      ) : null}
      {children}
    </button>
  );
}
