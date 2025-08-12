
import { GoogleGenAI, GenerateContentParameters, Type } from "@google/genai";
import type { UserInput, AnalysisResponse } from '../types';

// Do not expose API KEY in the source code.
// This is read from environment variables.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    productName: {
      type: Type.STRING,
      description: "The full product name of the headphone/earphone.",
    },
    type: {
      type: Type.STRING,
      description: "The type of headphone (e.g., Over-ear, In-ear, On-ear).",
    },
    fitReason: {
      type: Type.STRING,
      description: "A detailed explanation of why this product is a good fit for the user based on their provided ear size estimation.",
    },
    comfort: {
      type: Type.STRING,
      description: "Description of the product's comfort profile.",
    },
    sound: {
      type: Type.STRING,
      description: "Description of the product's sound signature (e.g., Bass-heavy, Neutral, Bright).",
    },
    pros: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key advantages or pros for this product.",
    },
    cons: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key disadvantages or cons for this product.",
    },
    fitConfidenceScore: {
      type: Type.NUMBER,
      description: "A score from 1 to 10 indicating confidence in the fit recommendation.",
    },
    productUrl: {
      type: Type.STRING,
      description: "A URL to a search results page (like Google Shopping or Amazon) for purchasing the product.",
    }
  },
  required: ['productName', 'type', 'fitReason', 'comfort', 'sound', 'pros', 'cons', 'fitConfidenceScore', 'productUrl']
};


export async function getHeadphoneRecommendations(userInput: UserInput): Promise<AnalysisResponse> {
  const model = "gemini-2.5-flash";

  const textPrompt = `
You are an expert AI assistant specializing in audio equipment. Your goal is to recommend the most comfortable and best-fitting headphones or earphones based on the user's provided information.

**User Profile:**
- Ear Size Estimation: "${userInput.features}"
- Budget: "${userInput.budget}"
- Primary Use Cases: ${userInput.useCase.join(', ')}
- Preferred Headphone Type: "${userInput.preferredType}"
- Desired Features: ${userInput.desiredFeatures.length > 0 ? userInput.desiredFeatures.join(', ') : 'None specified'}
- Platform Compatibility: ${userInput.platformCompatibility.length > 0 ? userInput.platformCompatibility.join(', ') : 'Any'}
- Desired Battery Life: "${userInput.batteryLife}"
- Microphone Quality Priority: "${userInput.micQuality}"
- Top Comfort Priority: "${userInput.comfort}"
- Style/Brand Preferences: "${userInput.style || 'None specified'}"

**Your Task:**
- Based on the user's estimated ear size and preferences, suggest 3-5 product recommendations.
- Heavily weigh the user's "Preferred Headphone Type". If they select "Any", use your expertise to choose the best type for their other preferences.
- The "Desired Features", "Platform Compatibility", "Battery Life", and "Microphone Quality" are important criteria. Prioritize products that match these needs.
- For in-ear models, consider the ear size for recommending appropriate tip sizes or models known for a good fit range.
- For on-ear and over-ear models, consider how a user's estimated ear size might affect comfort and seal. For example, a user with larger ears might need larger earcups.
- Provide all the information required by the JSON schema. This includes a 'productUrl' which should be a web search link (e.g., Google Shopping, Amazon) for the product.
- Assign a "Fit Confidence Score" from 1 to 10 for each recommendation.
- Ensure your output is a single, valid JSON object that strictly adheres to the provided schema. Do not include any other text or markdown formatting.
`;

  const responseSchema = {
      type: Type.OBJECT,
      properties: {
          recommendations: {
              type: Type.ARRAY,
              description: "A list of 3-5 headphone recommendations.",
              items: recommendationSchema,
          },
      },
      required: ['recommendations']
  };

  const request: GenerateContentParameters = {
    model,
    contents: textPrompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.5,
      responseSchema: responseSchema,
    }
  };

  try {
    const response = await ai.models.generateContent(request);

    const jsonStr = response.text.trim();
    const parsedData = JSON.parse(jsonStr);

    if (parsedData && Array.isArray(parsedData.recommendations)) {
      return parsedData as AnalysisResponse;
    } else {
      throw new Error("Invalid response format from API. Expected 'recommendations' array.");
    }

  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
      throw new Error("The AI returned an invalid response. Please try again.");
    }
    throw new Error("Failed to get recommendations. The AI might be busy, please try again.");
  }
}
