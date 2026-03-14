import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Simple In-Memory Cache for production stability
const AI_CACHE = new Map<string, string>();

export const generateAIContent = async (prompt: string) => {
    console.log(`AI: Request started. Keys detected: OpenRouter=${!!OPENROUTER_API_KEY}, Gemini=${!!GEMINI_API_KEY}`);
    let lastError = "";

    // 1. Check Cache First
    if (AI_CACHE.has(prompt)) {
        console.log("AI: ✅ Cache Hit!");
        return AI_CACHE.get(prompt);
    }

    // 2. Try OpenRouter (LATEST 2026 FREE MODELS)
    if (OPENROUTER_API_KEY) {
        const orModels = [
            "openrouter/free",              // Intelligent Free Router (Best for 2026)
            "google/gemma-3-4b:free",       // New Gemma 3 (Ultra Reliable)
            "google/gemma-3-12b:free",      // High Quality Gemma 3
            "google/gemma-3n-4b:free",      // Optimized Gemma 3
            "meta-llama/llama-3.1-8b-instruct:free",
            "microsoft/phi-3-mini-128k-instruct:free"
        ];

        // Extreme key cleaning (removes ANY hidden chars like quotes or spaces)
        const cleanKey = OPENROUTER_API_KEY.trim().replace(/['"]+/g, '').replace(/[^a-zA-Z0-9_-]/g, '');

        for (const model of orModels) {
            try {
                console.log(`AI: 🚀 Trying OpenRouter (Free) -> ${model}`);
                const response = await axios.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        model: model,
                        messages: [{ role: "user", content: prompt }],
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${cleanKey}`,
                            "Content-Type": "application/json",
                            "HTTP-Referer": "http://localhost:3000",
                            "X-Title": "ResumeAI Pro"
                        },
                        timeout: 50000
                    }
                );

                const content = response.data?.choices?.[0]?.message?.content;
                if (content && content.length > 3) {
                    console.log(`AI: ✅ SUCCESS with OpenRouter [${model}]`);
                    const result = content.trim();
                    AI_CACHE.set(prompt, result);
                    return result;
                }
            } catch (err: any) {
                const status = err.response?.status;
                const msg = err.response?.data?.error?.message || err.message;
                lastError = `OpenRouter (${model}): ${msg}`;
                console.warn(`AI: ⚠️ ${lastError}`);

                // If it's a critical auth error, don't keep trying models
                if (status === 401 || status === 403) break;
            }
        }
    }

    // 3. Try Direct Gemini (Stable Fallback)
    if (GEMINI_API_KEY) {
        const cleanGemKey = GEMINI_API_KEY.trim().replace(/['"]+/g, '').replace(/[^a-zA-Z0-9_-]/g, '');
        const endpoints = [
            { ver: "v1", m: "gemini-1.5-flash" },
            { ver: "v1beta", m: "gemini-1.5-flash" },
            { ver: "v1beta", m: "gemini-2.0-flash" }
        ];

        for (const { ver, m } of endpoints) {
            try {
                console.log(`AI: 🔄 Trying Gemini -> ${m} (${ver})`);
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/${ver}/models/${m}:generateContent?key=${cleanGemKey}`,
                    { contents: [{ parts: [{ text: prompt }] }] },
                    { timeout: 30000 }
                );

                const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text && text.length > 5) {
                    console.log(`AI: ✅ SUCCESS with Direct Gemini`);
                    const result = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "").trim();
                    AI_CACHE.set(prompt, result);
                    return result;
                }
            } catch (err: any) {
                const msg = err.response?.data?.error?.message || err.message;
                lastError = `Gemini (${m}): ${msg}`;
                console.warn(`AI: ⚠️ ${lastError}`);
            }
        }
    }

    throw new Error(`AI System exhausted all free providers. Last Reason: ${lastError}`);
};
