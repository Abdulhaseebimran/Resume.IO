const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function test() {
    console.log("Testing with Key:", GEMINI_API_KEY);
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: "Hello" }] }] }
        );
        console.log("FLASH V1 SUCCESS");
    } catch (e) {
        console.log("FLASH V1 FAILED:", e.response?.data?.error?.message || e.message);
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: "Hello" }] }] }
        );
        console.log("FLASH V1BETA SUCCESS");
    } catch (e) {
        console.log("FLASH V1BETA FAILED:", e.response?.data?.error?.message || e.message);
    }
}

test();
