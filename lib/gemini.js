import { GoogleGenAI } from "@google/genai";

// ✅ FIX: API key should be passed as an object
const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export async function semanticSearch(query, products) {
  try {
    const prompt = `
I have a list of products, and I want to find the ones that match this search query: "${query}".

Analyze the query and find semantically matching products — even if the words don't exactly match.

⚠️ Very Important:
Return ONLY a raw JSON array of the matching product IDs like this: ["id1", "id2"]
Do NOT explain or say anything else — just return the array.

Here is the list of products:
${JSON.stringify(products.map(p => ({
  id: p.id,
  name: p.name,
  description: p.description,
  category: p.category,
  tags: p.tags
})))}
`;


    // ✅ This is correct usage for @google/genai
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = result.text;
    console.log(text)

    try {
      const matches = JSON.parse(text.replace(/```json|```/g, '').trim());
      if (Array.isArray(matches)) {
        return products.filter(product => matches.includes(product.id));
      }
      return [];
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return [];
    }
  } catch (error) {
    console.error("Error using Gemini API:", error);
    return [];
  }
}
