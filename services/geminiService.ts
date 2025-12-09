import { GoogleGenAI } from "@google/genai";
import { PACKAGES, BOOKS } from "../constants";

// Initialize Gemini
// Note: In a production app, ensure the API key is strictly environment variable based and proxy via backend if needed for safety.
// Here we follow the requested pattern.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPublishingAdvice = async (userQuery: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    
    const context = `
      You are an expert publishing consultant for "T & R Birthing Books Publishing", a company based in Lubbock, Texas.
      The company colors are Purple and Gold.
      Contact Phone: 806-939-1226
      Contact Email: trbirthingbookspubliishing@gmail.com
      
      Your goal is to assist authors in choosing a package or finding a book.
      
      Available Packages:
      ${PACKAGES.map(p => `- ${p.title} (${p.price}): ${p.features.join(', ')}`).join('\n')}
      
      Featured Books in Catalog:
      ${BOOKS.map(b => `- "${b.title}" by ${b.genre}`).join('\n')}
      
      Tone: Professional, encouraging, warm, Texan hospitality.
      Keep answers concise (under 100 words).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
            role: 'user',
            parts: [{ text: `Context: ${context}\n\nUser Query: ${userQuery}` }]
        }
      ],
    });

    return response.text || "I apologize, I'm having trouble connecting to the literary archives right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please contact our office directly at the number listed below.";
  }
};