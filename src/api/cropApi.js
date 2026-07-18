// Fetch disease data from MongoDB
export async function fetchCropDisease(crop) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/crops/search?crop=${crop}`
  );

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return res.json();
}

// AI Disease Analysis
export async function analyzeDisease(crop, disease, symptoms) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/ai/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        crop,
        disease,
        symptoms,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`AI Error: ${res.status}`);
  }

  return res.json();
}