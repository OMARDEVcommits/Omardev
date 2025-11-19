import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image based on the provided text prompt.
 * Uses the high-quality 'imagen-4.0-generate-001' model.
 */
export const generateSportsImage = async (prompt: string, aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' = '1:1'): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    
    if (!imageBytes) {
      throw new Error("No image data returned from the API.");
    }

    return `data:image/jpeg;base64,${imageBytes}`;
  } catch (error: any) {
    console.error("Error generating image:", error);
    // Extract a meaningful message if possible
    const errorMessage = error.message || "Failed to generate image. Please try again.";
    throw new Error(errorMessage);
  }
};