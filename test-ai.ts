import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function test() {
    console.log("Testing Gemini API Key:", GEMINI_API_KEY ? "EXISTS" : "MISSING");
    if (!GEMINI_API_KEY) return;

    const models = ["gemini-1.5-flash", "gemini-pro"];
    const versions = ["v1", "v1beta"];

    for (const model of models) {
        for (const ver of versions) {
            try {
                console.log(`Checking ${model} on ${ver}...`);
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
                    { contents: [{ parts: [{ text: "Hi" }] }] }
                );
                console.log(`SUCCESS: ${model} ${ver}`);
                return;
            } catch (err: any) {
                console.log(`FAILED: ${model} ${ver} - ${err.response?.status} ${err.response?.data?.error?.message || err.message}`);
            }
        }
    }
}

test();
