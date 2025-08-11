
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStrategyGuide(query: string, queryType: string): Promise<string> {
  const systemPrompt = `You are an expert Farcaster Tower Defense strategist. Provide detailed, actionable advice for tower defense gameplay. Format your response in markdown with clear sections and bullet points.

Query Type: ${queryType}
- build: Focus on tower builds, unit combinations, upgrade paths
- resource: Focus on economy management, farming efficiency, resource allocation
- boss: Focus on specific boss strategies, positioning, timing
- general: Provide general gameplay tips and strategies

Keep responses concise but comprehensive, around 300-500 words. Include specific numbers, timings, and positioning advice where relevant.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "Unable to generate guide at this time.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate AI guide');
  }
}
