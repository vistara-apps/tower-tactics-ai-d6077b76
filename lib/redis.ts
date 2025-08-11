import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://dummy-url-for-build.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'dummy-token-for-build',
});

function checkRedisConfig() {
  if (!process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL === 'https://dummy-url-for-build.upstash.io') {
    throw new Error('Redis configuration not available');
  }
}

export async function storeUser(user: any) {
  checkRedisConfig();
  return await redis.set(`user:${user.farcasterId}`, user);
}

export async function getUser(farcasterId: string) {
  checkRedisConfig();
  return await redis.get(`user:${farcasterId}`);
}

export async function storeInquiry(inquiry: any) {
  checkRedisConfig();
  await redis.set(`inquiry:${inquiry.id}`, inquiry);
  await redis.lpush(`user:${inquiry.userId}:inquiries`, inquiry.id);
}

export async function getUserInquiries(userId: string) {
  checkRedisConfig();
  const inquiryIds = await redis.lrange(`user:${userId}:inquiries`, 0, -1);
  const inquiries = [];
  
  for (const id of inquiryIds) {
    const inquiry = await redis.get(`inquiry:${id}`);
    if (inquiry) inquiries.push(inquiry);
  }
  
  return inquiries;
}

export async function storePremiumGuide(guideId: string, content: string) {
  checkRedisConfig();
  return await redis.setex(`premium_guide:${guideId}`, 86400, content); // 24h expiry
}

export async function getPremiumGuide(guideId: string) {
  checkRedisConfig();
  return await redis.get(`premium_guide:${guideId}`);
}
