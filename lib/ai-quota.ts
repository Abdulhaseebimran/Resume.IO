import dbConnect from "./mongodb";
import AIUsage from "@/models/AIUsage";

const FREE_TIER_DAILY_LIMIT = 15; // Increased to 15 for better user experience

export async function checkUserQuota(userId: string): Promise<{ allowed: boolean; remaining: number }> {
    await dbConnect();
    const today = new Date().toISOString().split('T')[0];

    let usage = await AIUsage.findOne({
        userId,
        date: today
    });

    if (!usage) {
        usage = await AIUsage.create({ userId, date: today, count: 0 });
    }

    const allowed = usage.count < FREE_TIER_DAILY_LIMIT;
    const remaining = Math.max(0, FREE_TIER_DAILY_LIMIT - usage.count);

    return { allowed, remaining };
}

export async function incrementUserQuota(userId: string): Promise<void> {
    await dbConnect();
    const today = new Date().toISOString().split('T')[0];

    await AIUsage.findOneAndUpdate(
        { userId, date: today },
        { $inc: { count: 1 } },
        { upsert: true }
    );
}

export function getDailyLimit() {
    return FREE_TIER_DAILY_LIMIT;
}
