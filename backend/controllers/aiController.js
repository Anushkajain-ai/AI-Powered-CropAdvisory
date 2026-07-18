const { analyzeCrop } = require("../services/geminiService");

const analyzeDisease = async (req, res) => {
  try {
    const { crop, disease, symptoms } = req.body;

    const prompt = `
You are an expert agricultural scientist.

Crop: ${crop}
Disease: ${disease}
Observed Symptoms:
${symptoms}

Answer ONLY in English.

Use this exact format.

# Disease Match
Explain whether the symptoms match the disease.

# Cause
Explain what causes this disease.

# Severity
Explain how severe it can become.

# Prevention
Give exactly 5 prevention methods as bullet points.

# Organic Treatment
Give only real organic treatments that are commonly recommended.

# Chemical Treatment
Give only approved fungicides or pesticides.
Mention only real active ingredients.
Do NOT invent product names.

# Farmer Advice
Give exactly 5 simple tips for farmers.

Rules:
- Never mix languages.
- Never use Arabic, Chinese, Hindi, or any other language.
- Never invent medicines, fungicides, or pesticides.
- Never invent statistics or percentages.
- Use simple English suitable for farmers.
- Keep the answer under 500 words.
- Use Markdown headings and bullet points only.
- If unsure, say: "Consult your local agriculture officer."
`;

    const aiResponse = await analyzeCrop(prompt);

    res.status(200).json({
      success: true,
      response: aiResponse,
    });

  } catch (err) {
    console.error("========== AI ERROR ==========");
    console.error(err.response?.data || err.message);
    console.error("================================");

    res.status(500).json({
      success: false,
      message: err.message,
      error: err.toString(),
    });
  }
};

module.exports = {
  analyzeDisease,
};