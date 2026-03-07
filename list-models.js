const axios = require('axios');
const key = "AIzaSyAe12q_rKW9a6MJIjWVUZc48TvO2wyRG0U";

async function listModels() {
    try {
        console.log("Listing models for Gemini Key...");
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        console.log("Models found:");
        response.data.models.forEach(m => console.log(m.name));
    } catch (e) {
        console.log("Failed to list models:", e.response?.data?.error?.message || e.message);
    }
}

listModels();
