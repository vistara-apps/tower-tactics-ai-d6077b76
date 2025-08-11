
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GuideDisplayProps {
  content: string;
  title?: string;
  tags?: string[];
  difficulty?: string;
  estimatedTime?: string;
  onClose?: () => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

export function GuideDisplay({ 
  content, 
  title = "Strategy Guide",
  tags = [],
  difficulty,
  estimatedTime,
  onClose,
  isPremium,
  onUpgrade
}: GuideDisplayProps) {
  // Convert markdown-style content to basic HTML
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h2>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-lg font-semibold mt-3 mb-2">{line.substring(3)}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{title}</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {difficulty && (
            <Badge variant="outline">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          )}
          {estimatedTime && (
            <Badge variant="secondary">
              {estimatedTime}
            </Badge>
          )}
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm max-w-none text-textPrimary">
          {formatContent(content)}
        </div>
        
        {isPremium && onUpgrade && (
          <div className="mt-6 p-4 bg-accent/10 rounded-md border border-accent/20">
            <p className="text-sm text-textSecondary mb-3">
              This is a preview. Upgrade to premium for the complete strategy guide with advanced tactics and detailed analysis.
            </p>
            <Button variant="primary" size="sm" onClick={onUpgrade}>
              Upgrade to Premium
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
