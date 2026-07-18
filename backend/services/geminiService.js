const axios = require("axios");

async function analyzeCrop(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",

        messages: [
          {
            role: "system",
            content: `
You are an expert agricultural scientist helping farmers.

Rules:
- Respond ONLY in English.
- Never mix languages.
- Never invent diseases, fungicides, medicines, chemicals, products, or brand names.
- Never invent percentages, statistics, or scientific facts.
- Recommend only commonly accepted agricultural practices.
- If a treatment varies by country, mention that farmers should follow local agricultural guidelines.
- Keep explanations simple and easy for farmers to understand.
- Use Markdown headings and bullet points.
- If information is uncertain, clearly say "Consult your local agriculture officer."
- Never mention that you are an AI.
- Do not include warnings unrelated to farming.

Always answer using this format:

## 1. Do the symptoms match the disease?

## 2. What causes the disease?

## 3. How severe can it become?

## 4. Prevention methods

## 5. Organic treatment

## 6. Chemical treatment

## 7. Farmer advice
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.2,
        max_tokens: 1200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log("========== OPENROUTER ERROR ==========");
    console.log(err.response?.data || err.message);
    console.log("======================================");
    throw err;
  }
}

module.exports = { analyzeCrop };