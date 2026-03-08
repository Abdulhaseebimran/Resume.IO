import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Simple In-Memory Cache for production stability
const AI_CACHE = new Map<string, string>();

export const generateAIContent = async (prompt: string) => {
    console.log(`AI: Request started. Keys present: OpenRouter=${!!OPENROUTER_API_KEY}, Gemini=${!!GEMINI_API_KEY}`);
    let lastError = "";

    // 1. Check Cache First
    if (AI_CACHE.has(prompt)) {
        console.log("AI: ✅ Cache Hit!");
        return AI_CACHE.get(prompt);
    }

    // 2. Try OpenRouter (FREE & Elite Models First)
    if (OPENROUTER_API_KEY) {
        const orModels = [
            "meta-llama/llama-3.3-70b-instruct:free", // Elite Quality (Free)
            "google/gemini-2.0-flash-exp:free",      // Google's Next-Gen (Free)
            "meta-llama/llama-3.1-8b-instruct:free",  // High Speed (Free)
            "mistralai/mistral-7b-instruct:free",      // Reliable (Free)
            "qwen/qwen-2-7b-instruct:free"
        ];

        for (const model of orModels) {
            try {
                console.log(`AI: 🚀 Trying OpenRouter Elite (${model})...`);
                const response = await axios.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        model: model,
                        messages: [{ role: "user", content: prompt }],
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                            "Content-Type": "application/json",
                            "HTTP-Referer": "https://resume-io-9wk7.vercel.app",
                            "X-Title": "Resume.IO Pro"
                        },
                        timeout: 30000
                    }
                );

                const content = response.data?.choices?.[0]?.message?.content;
                if (content) {
                    console.log(`AI: ✅ SUCCESS with OpenRouter (${model})`);
                    const result = content.trim();
                    AI_CACHE.set(prompt, result); // Cache the result
                    return result;
                }
            } catch (err: any) {
                const errMsg = err.response?.data?.error?.message || err.message;
                lastError = `OpenRouter (${model}): ${errMsg}`;
                console.warn(`AI: ⚠️ ${lastError} failed.`);
            }
        }
    }

    // 3. Try Direct Gemini (Multiple versions)
    if (GEMINI_API_KEY) {
        const geminiModels = [
            { ver: "v1beta", model: "gemini-2.0-flash" },
            { ver: "v1beta", model: "gemini-1.5-flash" },
            { ver: "v1", model: "gemini-1.5-flash" }
        ];

        for (const { ver, model } of geminiModels) {
            try {
                console.log(`AI: 🔄 Trying Direct Gemini ${model} (${ver})...`);
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        contents: [{ parts: [{ text: prompt }] }],
                    },
                    { timeout: 20000 }
                );

                const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    console.log(`AI: ✅ SUCCESS with Direct Gemini (${model})`);
                    const result = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "").trim();
                    AI_CACHE.set(prompt, result); // Cache the result
                    return result;
                }
            } catch (err: any) {
                const msg = err.response?.data?.error?.message || err.message;
                lastError = `Gemini (${model}): ${msg}`;
                console.warn(`AI: ⚠️ ${lastError} failed.`);
            }
        }
    }

    // Prepare a descriptive error message based on what happened
    let diagnosticMsg = "System Error: All AI providers failed. ";
    if (!OPENROUTER_API_KEY && !GEMINI_API_KEY) {
        diagnosticMsg += "AI keys are missing in .env.local.";
    } else {
        diagnosticMsg += `Last Error: ${lastError || "Services busy"}. Please try again in 1 minute.`;
    }

    throw new Error(diagnosticMsg);
};
