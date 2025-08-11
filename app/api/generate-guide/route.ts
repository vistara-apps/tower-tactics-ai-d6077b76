
import { NextRequest, NextResponse } from 'next/server';
import { generateStrategyGuide } from '@/lib/openai';
import { storeInquiry } from '@/lib/redis';
import { generateId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { query, queryType, userId } = await request.json();

    if (!query || !queryType) {
      return NextResponse.json(
        { error: 'Query and queryType are required' },
        { status: 400 }
      );
    }

    // Generate AI guide
    const guide = await generateStrategyGuide(query, queryType);

    // Store inquiry
    const inquiry = {
      id: generateId(),
      userId: userId || 'anonymous',
      queryType,
      specifics: query,
      createdAt: new Date(),
    };

    await storeInquiry(inquiry);

    // Determine if this should be premium content based on complexity
    const isPremium = query.length > 100 || queryType === 'boss' || query.toLowerCase().includes('advanced');

    return NextResponse.json({
      guide,
      isPremium,
      inquiryId: inquiry.id,
      difficulty: queryType === 'general' ? 'beginner' : 'intermediate',
      estimatedTime: '5-10 min read',
      tags: [queryType, 'strategy', 'tower-defense'],
    });

  } catch (error) {
    console.error('Guide generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate guide' },
      { status: 500 }
    );
  }
}
