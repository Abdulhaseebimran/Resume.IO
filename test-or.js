const axios = require('axios');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function test() {
    console.log("Testing OpenRouter...");
    try {
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "google/gemini-flash-1.5",
            messages: [{ role: "user", content: "Hi" }],
        }, {
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        console.log("OPENROUTER SUCCESS:", response.data.choices[0].message.content);
    } catch (e) {
        console.log("OPENROUTER FAILED:", e.response?.data?.error?.message || e.message);
    }
}
test();
