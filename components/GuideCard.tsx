'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Guide } from "@/app/types";

interface GuideCardProps {
  guide: Guide;
  variant?: 'default' | 'premium';
  onPurchase?: (guideId: string) => void;
  onView?: (guideId: string) => void;
  isPurchased?: boolean;
}

export function GuideCard({ 
  guide, 
  variant = 'default', 
  onPurchase, 
  onView,
  isPurchased = false 
}: GuideCardProps) {
  const isPremium = variant === 'premium' || guide.isPremium;

  return (
    <Card className={`animate-slide-up card-hover group ${
      isPremium 
        ? 'border-premium bg-gradient-to-br from-premiumBg to-card hover:shadow-premium' 
        : 'hover:shadow-cardHover hover:bg-cardHover'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className={`text-lg leading-tight ${
            isPremium ? 'text-primary' : 'text-textPrimary'
          } group-hover:text-primary transition-colors`}>
            {guide.title}
          </CardTitle>
          {isPremium && (
            <Badge 
              variant="default" 
              className="bg-gradient-to-r from-premium to-accent text-white shadow-sm shrink-0"
            >
              ✨ Premium
            </Badge>
          )}
        </div>
        <p className="text-sm text-textSecondary leading-relaxed mt-2">
          {guide.description}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {guide.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className={`text-xs transition-colors ${
                isPremium 
                  ? 'border-premium/30 text-premium hover:bg-premium/10' 
                  : 'hover:bg-surface'
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Difficulty and time indicators */}
        <div className="flex items-center gap-4 mb-4 text-xs text-textMuted">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span>Beginner</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>5 min read</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPremium ? (
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg text-primary">
                  {formatPrice(guide.price)}
                </span>
                <span className="text-xs text-textMuted line-through">
                  {formatPrice(guide.price * 1.5)}
                </span>
              </div>
            ) : (
              <span className="text-sm text-success font-semibold bg-success/10 px-2 py-1 rounded-md">
                Free
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            {isPurchased || !isPremium ? (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => onView?.(guide.id)}
                className="shadow-button hover:shadow-buttonHover"
              >
                View Guide
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onView?.(guide.id)}
                  className="text-textMuted hover:text-textPrimary"
                >
                  Preview
                </Button>
                <Button 
                  variant="premium" 
                  size="sm"
                  onClick={() => onPurchase?.(guide.id)}
                  className="font-semibold"
                >
                  Get Premium
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
