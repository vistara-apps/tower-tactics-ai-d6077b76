
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
  { id: 'build', label: 'Tower Builds', description: 'Optimal builds and unit combinations' },
  { id: 'resource', label: 'Resource Management', description: 'Economy and farming strategies' },
  { id: 'boss', label: 'Boss Strategy', description: 'Specific boss and wave tactics' },
  { id: 'general', label: 'General Tips', description: 'Overall gameplay advice' },
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
    <Card>
      <CardHeader>
        <CardTitle>Ask for Strategy Advice</CardTitle>
        <p className="text-sm text-textSecondary">
          Describe your current challenge or what you'd like to improve
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {queryTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-md border text-left transition-colors ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-surface'
                  }`}
                >
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className="text-xs text-textSecondary">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Your Question</label>
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What's the best tower build for wave 15? I'm struggling with the flying enemies..."
              rows={4}
              disabled={loading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            loading={loading}
            disabled={!query.trim() || loading}
          >
            Generate Strategy Guide
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
