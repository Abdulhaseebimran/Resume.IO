import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateAIContent } from "@/lib/ai";
import { checkUserQuota, incrementUserQuota } from "@/lib/ai-quota";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;

        // 1. Check Quota
        const { allowed, remaining } = await checkUserQuota(userId);
        if (!allowed) {
            return NextResponse.json(
                { message: "You have reached your daily limit of 15 AI generations. Please try again tomorrow or upgrade to Pro." },
                { status: 429 }
            );
        }

        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
        }

        // 2. Generate Content
        const text = await generateAIContent(prompt);

        // 3. Increment Quota only on success
        await incrementUserQuota(userId);

        return NextResponse.json({ text, remaining: remaining - 1 });
    } catch (error: any) {
        console.error("AI API Flow Error:", error.message);
        return NextResponse.json(
            { text: null, error: error.message || "Failed to generate AI content" },
            { status: 500 }
        );
    }
}
