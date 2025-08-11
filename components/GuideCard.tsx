
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
    <Card className={`animate-slide-up ${isPremium ? 'border-accent' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{guide.title}</CardTitle>
          {isPremium && (
            <Badge variant="default" className="bg-accent">
              Premium
            </Badge>
          )}
        </div>
        <p className="text-sm text-textSecondary">{guide.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-4">
          {guide.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPremium && (
              <span className="font-semibold text-primary">
                {formatPrice(guide.price)}
              </span>
            )}
            {!isPremium && (
              <span className="text-sm text-green-600 font-medium">Free</span>
            )}
          </div>
          
          <div className="flex gap-2">
            {isPurchased || !isPremium ? (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => onView?.(guide.id)}
              >
                View Guide
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onPurchase?.(guide.id)}
              >
                Purchase
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
