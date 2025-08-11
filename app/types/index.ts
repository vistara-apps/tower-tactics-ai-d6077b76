
export interface User {
  farcasterId: string;
  registeredAt: Date;
  purchasedGuides: string[];
  subscriptionStatus: 'free' | 'premium' | 'expired';
}

export interface Inquiry {
  id: string;
  userId: string;
  queryType: 'build' | 'resource' | 'boss' | 'general';
  specifics: string;
  generatedGuideUrl?: string;
  createdAt: Date;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  contentUrl?: string;
  tags: string[];
  price: number;
  isPremium: boolean;
  category: 'build' | 'resource' | 'boss' | 'general';
}

export interface AIResponse {
  guide: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  estimatedTime: string;
}
