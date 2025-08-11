'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface QueryFormProps {
  onSubmit: (query: string, queryType: string) => void;
  loading?: boolean;
}

const queryTypes = [
  { id: 'build', label: 'Tower Builds', description: 'Optimal builds and unit combinations', icon: '🏗️' },
  { id: 'resource', label: 'Resource Management', description: 'Economy and farming strategies', icon: '💰' },
  { id: 'boss', label: 'Boss Strategy', description: 'Specific boss and wave tactics', icon: '⚔️' },
  { id: 'general', label: 'General Tips', description: 'Overall gameplay advice', icon: '💡' },
];

const quickQuestions = [
  "What's the best tower build for wave 15?",
  "How do I manage resources efficiently?",
  "Best strategy against flying enemies?",
  "How to optimize my economy early game?",
];

export function QueryForm({ onSubmit, loading }: QueryFormProps) {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('build');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query, selectedType);
    }
  };

  return (
    <div className="space-y-6 px-4">
      <Card className="bg-gradient-to-br from-surface/30 to-bg border-border/50">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3 shadow-button">
            <span className="text-white text-xl">🤖</span>
          </div>
          <CardTitle className="text-xl bg-gradient-to-r from-textPrimary to-primary bg-clip-text text-transparent">
            Ask for Strategy Advice
          </CardTitle>
          <p className="text-sm text-textSecondary leading-relaxed">
            Get personalized AI-powered advice for your tower defense challenges
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold mb-3 block text-textPrimary">
                What type of help do you need?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {queryTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-lg border text-left transition-all duration-200 card-hover ${
                      selectedType === type.id
                        ? 'border-primary bg-primary/10 text-primary shadow-button'
                        : 'border-border hover:bg-surface hover:border-borderHover'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{type.icon}</span>
                      <div className="font-semibold text-sm">{type.label}</div>
                    </div>
                    <div className="text-xs text-textSecondary leading-relaxed">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-3 block text-textPrimary">
                Describe your challenge
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors text-xs py-1 px-2"
                      onClick={() => setQuery(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., What's the best tower build for wave 15? I'm struggling with the flying enemies and my current setup isn't working..."
                  rows={4}
                  disabled={loading}
                  className="resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full shadow-button hover:shadow-buttonHover" 
              loading={loading}
              disabled={!query.trim() || loading}
              size="lg"
            >
              {loading ? 'Generating Strategy...' : '🎯 Generate Strategy Guide'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
