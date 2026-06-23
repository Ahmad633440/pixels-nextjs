import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("Please define the GEMINI_API_KEY environment variable inside .env");
}

const ai = new GoogleGenAI({ apiKey });

export default ai;