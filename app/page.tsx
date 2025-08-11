
'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useNotification,
} from "@coinbase/onchainkit/minikit";
import { FrameContainer } from "@/components/FrameContainer";
import { QueryForm } from "@/components/QueryForm";
import { GuideDisplay } from "@/components/GuideDisplay";
import { GuideCard } from "@/components/GuideCard";
import { Button } from "@/components/ui/button";
import { NotificationBanner } from "@/components/NotificationBanner";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Guide, AIResponse } from "./types";

const featuredGuides: Guide[] = [
  {
    id: 'meta-builds-2024',
    title: 'Meta Tower Builds 2024',
    description: 'Current meta builds that dominate the leaderboards',
    tags: ['meta', 'builds', 'competitive'],
    price: 2.99,
    isPremium: true,
    category: 'build',
  },
  {
    id: 'resource-efficiency',
    title: 'Resource Efficiency Guide',
    description: 'Maximize your economy with proven farming strategies',
    tags: ['economy', 'farming', 'efficiency'],
    price: 1.99,
    isPremium: true,
    category: 'resource',
  },
  {
    id: 'beginner-basics',
    title: 'Beginner Tower Defense Basics',
    description: 'Essential tips for new players to get started',
    tags: ['beginner', 'basics', 'tutorial'],
    price: 0,
    isPremium: false,
    category: 'general',
  },
];

export default function HomePage() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [currentView, setCurrentView] = useState<'home' | 'guides' | 'query'>('home');
  const [loading, setLoading] = useState(false);
  const [currentGuide, setCurrentGuide] = useState<AIResponse | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [frameAdded, setFrameAdded] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    if (result) {
      setFrameAdded(true);
      setNotification('Frame added! You can now receive strategy notifications.');
      setTimeout(() => setNotification(null), 5000);
    }
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added && !frameAdded) {
      return (
        <Button variant="outline" size="sm" onClick={handleAddFrame}>
          Save App
        </Button>
      );
    }
    return null;
  }, [context, frameAdded, handleAddFrame]);

  const handleQuerySubmit = async (query: string, queryType: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query, 
          queryType, 
          userId: context?.client.fid || 'anonymous' 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate guide');

      const data = await response.json();
      setCurrentGuide(data);
      setCurrentView('guides');

      if (context?.client.added) {
        await sendNotification({
          title: 'Strategy Guide Ready! 🎯',
          body: 'Your personalized Tower Defense strategy has been generated.',
        });
      }
    } catch (error) {
      console.error('Error generating guide:', error);
      setNotification('Failed to generate guide. Please try again.');
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGuideView = (guideId: string) => {
    const guide = featuredGuides.find(g => g.id === guideId);
    if (guide && !guide.isPremium) {
      // Show free guide content
      setCurrentGuide({
        guide: `# ${guide.title}\n\n${guide.description}\n\nThis is a sample of the free content available. For more detailed guides, check out our premium offerings!`,
        difficulty: 'beginner',
        tags: guide.tags,
        estimatedTime: '3-5 min read',
      });
      setCurrentView('guides');
    }
  };

  const handlePurchase = async (guideId: string) => {
    const guide = featuredGuides.find(g => g.id === guideId);
    if (guide) {
      setNotification(`Purchase flow would open for ${guide.title} (${guide.price})`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between py-4 border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-primary">Tower Tactics AI</h1>
        <p className="text-sm text-textSecondary">AI-powered strategy guides</p>
      </div>
      <div className="flex items-center gap-2">
        {saveFrameButton}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => openUrl('https://docs.farcaster.xyz')}
        >
          About
        </Button>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex gap-2 py-4">
      <Button
        variant={currentView === 'home' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setCurrentView('home')}
      >
        Home
      </Button>
      <Button
        variant={currentView === 'query' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setCurrentView('query')}
      >
        Ask AI
      </Button>
      <Button
        variant={currentView === 'guides' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setCurrentView('guides')}
      >
        Guides
      </Button>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-3">Welcome to Tower Tactics AI</h2>
        <p className="text-textSecondary mb-6">
          Get AI-powered strategy advice for Farcaster Tower Defense. 
          Optimize your builds, manage resources, and conquer challenging waves.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => setCurrentView('query')}>
            Ask Strategy Question
          </Button>
          <Button variant="outline" onClick={() => setCurrentView('guides')}>
            Browse Guides
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Featured Guides</h3>
        <div className="space-y-3">
          {featuredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              variant={guide.isPremium ? 'premium' : 'default'}
              onView={handleGuideView}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuery = () => (
    <div className="space-y-6">
      <QueryForm onSubmit={handleQuerySubmit} loading={loading} />
      
      {loading && (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-textSecondary">Generating your strategy guide...</span>
        </div>
      )}
    </div>
  );

  const renderGuides = () => (
    <div className="space-y-6">
      {currentGuide && (
        <GuideDisplay
          content={currentGuide.guide}
          title="AI Strategy Guide"
          tags={currentGuide.tags}
          difficulty={currentGuide.difficulty}
          estimatedTime={currentGuide.estimatedTime}
          onClose={() => setCurrentGuide(null)}
        />
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">All Guides</h3>
        <div className="space-y-3">
          {featuredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              variant={guide.isPremium ? 'premium' : 'default'}
              onView={handleGuideView}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <FrameContainer>
      {renderHeader()}
      {renderNavigation()}
      
      {notification && (
        <div className="mb-4">
          <NotificationBanner 
            variant="success" 
            onClose={() => setNotification(null)}
          >
            {notification}
          </NotificationBanner>
        </div>
      )}

      <div className="pb-8">
        {currentView === 'home' && renderHome()}
        {currentView === 'query' && renderQuery()}
        {currentView === 'guides' && renderGuides()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
        <div className="container text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => openUrl('https://base.org')}
            className="text-xs text-textSecondary"
          >
            Built on Base with MiniKit
          </Button>
        </div>
      </div>
    </FrameContainer>
  );
}
