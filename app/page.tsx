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
    if (context && context.user && !frameAdded) {
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
          userId: context?.user?.fid || 'anonymous' 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate guide');

      const data = await response.json();
      setCurrentGuide(data);
      setCurrentView('guides');

      if (context?.user) {
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
    <div className="flex items-center justify-between py-6 border-b border-border bg-gradient-to-r from-bg to-surface/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-button">
          <span className="text-white font-bold text-lg">🏰</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tower Tactics AI
          </h1>
          <p className="text-sm text-textSecondary">AI-powered strategy guides for tower defense</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {saveFrameButton}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => openUrl('https://docs.farcaster.xyz')}
          className="text-textMuted hover:text-textPrimary"
        >
          About
        </Button>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex gap-1 py-4 bg-surface/30 rounded-lg p-1 mx-4 mt-4">
      <Button
        variant={currentView === 'home' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('home')}
        className={`flex-1 ${currentView === 'home' ? 'shadow-button' : ''}`}
      >
        🏠 Home
      </Button>
      <Button
        variant={currentView === 'query' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('query')}
        className={`flex-1 ${currentView === 'query' ? 'shadow-button' : ''}`}
      >
        🤖 Ask AI
      </Button>
      <Button
        variant={currentView === 'guides' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('guides')}
        className={`flex-1 ${currentView === 'guides' ? 'shadow-button' : ''}`}
      >
        📚 Guides
      </Button>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-8 px-4">
      <div className="text-center py-8 bg-gradient-to-br from-surface/50 to-bg rounded-xl border border-border/50">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-premium">
            <span className="text-white text-2xl">🎯</span>
          </div>
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-textPrimary to-primary bg-clip-text text-transparent">
            Welcome to Tower Tactics AI
          </h2>
          <p className="text-textSecondary mb-6 leading-relaxed max-w-md mx-auto">
            Get AI-powered strategy advice for tower defense games. 
            Optimize your builds, manage resources, and conquer challenging waves with expert guidance.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <Button 
            onClick={() => setCurrentView('query')}
            className="flex-1 shadow-button hover:shadow-buttonHover"
            size="lg"
          >
            🤖 Ask Strategy Question
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('guides')}
            className="flex-1"
            size="lg"
          >
            📚 Browse Guides
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-textPrimary">Featured Guides</h3>
          <div className="flex items-center gap-2 text-sm text-textMuted">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span>Updated daily</span>
          </div>
        </div>
        <div className="space-y-4">
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
        <div className="flex items-center justify-center py-12 bg-gradient-to-br from-surface/30 to-bg rounded-xl border border-border/50">
          <LoadingSpinner 
            size="lg" 
            text="Generating your personalized strategy guide..."
            className="text-center"
          />
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

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-surface to-bg border-t border-border/50 backdrop-blur-sm p-4">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-textMuted">
            <span>Built on</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => openUrl('https://base.org')}
              className="text-xs text-primary hover:text-primaryHover font-semibold p-1 h-auto"
            >
              Base ⚡
            </Button>
            <span>with</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => openUrl('https://docs.farcaster.xyz')}
              className="text-xs text-accent hover:text-accentHover font-semibold p-1 h-auto"
            >
              MiniKit 🚀
            </Button>
          </div>
        </div>
      </div>
    </FrameContainer>
  );
}
