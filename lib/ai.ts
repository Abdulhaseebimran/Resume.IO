import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export const generateAIContent = async (prompt: string) => {
    if (GEMINI_API_KEY) {
        const attempts = [
            { ver: "v1beta", model: "gemini-2.0-flash" },
            { ver: "v1beta", model: "gemini-1.5-flash" },
            { ver: "v1beta", model: "gemini-1.5-pro" },
            { ver: "v1", model: "gemini-2.0-flash" },
            { ver: "v1", model: "gemini-1.5-flash" },
        ];

        for (const { ver, model } of attempts) {
            try {
                console.log(`AI: Trying Direct Gemini ${model} (${ver})...`);
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 4096
                        }
                    },
                    { timeout: 30000 }
                );

                const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    console.log(`AI: SUCCESS with ${model}`);
                    return text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "").trim();
                }
            } catch (err: any) {
                const msg = err.response?.data?.error?.message || err.message;
                const status = err.response?.status;

                if (status === 429) {
                    console.warn(`AI: Model ${model} is Rate Limited (429). Switching...`);
                    continue;
                }

                console.warn(`AI: Direct ${model} (${ver}) failed: ${msg}`);

                if (status === 400 && msg.includes("API key")) {
                    console.error("CRITICAL: Invalid Gemini API Key detected.");
                    break;
                }
            }
        }
    }

    if (OPENROUTER_API_KEY) {
        try {
            console.log("AI: Trying OpenRouter Fallback (Llama-3)...");
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "meta-llama/llama-3.1-8b-instruct:free",
                    messages: [{ role: "user", content: prompt }],
                },
                {
                    headers: {
                        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                        "X-Title": "ResumeAI Pro"
                    },
                    timeout: 30000
                }
            );

            const content = response.data?.choices?.[0]?.message?.content;
            if (content) {
                console.log("AI: SUCCESS with OpenRouter Fallback");
                return content.trim();
            }
        } catch (err: any) {
            console.error("AI: OpenRouter fallback failed:", err.message);
        }
    }

    throw new Error("AI models are currently at capacity or your API key is restricted. Please check your .env.local or try again in 1 minute. (Full Scan failed)");
};
