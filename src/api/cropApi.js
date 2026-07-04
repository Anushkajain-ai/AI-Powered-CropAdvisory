export async function fetchCropDisease(crop) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/crops/search?crop=${crop}`
  );

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return res.json();
}