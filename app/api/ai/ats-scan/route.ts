import { NextResponse } from "next/server";
import { generateAIContent } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { resumeData, jobDescription } = await req.json();

        if (!resumeData) {
            return NextResponse.json({ message: "Resume data is required" }, { status: 400 });
        }

        const prompt = `
            Act as an expert Applicant Tracking System (ATS) and Senior Technical Recruiter.
            Analyze the following resume against the provided Job Description.

            ### JOB DESCRIPTION:
            ${jobDescription || "Not provided (General Review)"}

            ### RESUME DATA:
            ${JSON.stringify(resumeData)}

            ### YOUR TASK:
            1. Calculate an ATS Score (0-100) based on keyword matching, formatting, and relevance.
            2. Provide 4-5 specific, actionable points for improvement.
            3. Each point must have a 'type' (success, warning, error) and 'points' (weightage).

            ### RESPONSE FORMAT (Strict JSON):
            {
                "score": 85,
                "analysis": [
                    { "text": "Keywords found: React, Node.js", "type": "success", "points": 20 },
                    { "text": "Summary could be more impact-driven", "type": "warning", "points": 10 }
                ]
            }
        `;

        const aiResponse = await generateAIContent(prompt);
        console.log("AI ATS Response Received.");

        // Robust JSON Extraction
        let results = null;
        try {
            const startIdx = aiResponse.indexOf('{');
            const endIdx = aiResponse.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
                const jsonText = aiResponse.substring(startIdx, endIdx + 1);
                results = JSON.parse(jsonText);
            }
        } catch (e) {
            console.error("Failed to parse AI JSON:", e);
        }

        if (results && typeof results.score === 'number') {
            return NextResponse.json(results);
        }

        throw new Error("Invalid AI Data");

    } catch (error: any) {
        console.error("ATS Scan AI Failed, using Rule-Based Fallback Engine...");

        // RULE-BASED FALLBACK (So user never gets 500 error)
        try {
            const info = await req.clone().json();
            const data = info.resumeData;

            let score = 40;
            const analysis = [];

            if (data?.personalInfo?.fullName) { score += 10; analysis.push({ text: "Contact Information is professional", type: "success", points: 10 }); }
            if (data?.summary?.length > 100) { score += 15; analysis.push({ text: "Professional summary is impactful", type: "success", points: 15 }); }
            if (data?.experience?.length >= 2) { score += 20; analysis.push({ text: "Solid work history detected", type: "success", points: 20 }); }
            if ((data?.skills?.technical?.length || 0) > 5) { score += 10; analysis.push({ text: "Technical skills are well-distributed", type: "success", points: 10 }); }

            if (analysis.length === 0) {
                analysis.push({ text: "Add more detailed experience and skills to improve score", type: "warning", points: 0 });
            }

            return NextResponse.json({
                score: Math.min(score, 98),
                analysis: analysis,
                isFallback: true
            });
        } catch (fallbackError) {
            return NextResponse.json({ score: 75, analysis: [{ text: "Basic scan complete. AI services busy.", type: "warning", points: 0 }] });
        }
    }
}
