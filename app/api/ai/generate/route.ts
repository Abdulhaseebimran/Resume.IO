import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateAIContent } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
        }

        const text = await generateAIContent(prompt);

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("AI API Flow Error:", error.message);
        return NextResponse.json(
            { text: null, error: error.message || "Failed to generate AI content" },
            { status: 500 }
        );
    }
}
