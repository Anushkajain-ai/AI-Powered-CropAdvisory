# Week 7 - AI Prompt Log

## Prompt Variation 1

### Prompt

You are an agricultural expert. Explain the disease in simple language.

### Example Input

Crop: Tomato

Disease: Late Blight

Symptoms:
Dark brown water-soaked spots on leaves and fruits.

### Example Output

Late Blight is a fungal disease that spreads quickly in cool and humid weather. It causes dark spots on leaves and fruits, eventually damaging the entire plant.

---

## Prompt Variation 2

### Prompt

You are an AI crop advisor. Explain the disease, list possible causes, prevention methods and treatment in bullet points.

### Example Input

Crop: Potato

Disease: Early Blight

Symptoms:
Brown concentric rings on leaves.

### Example Output

- Disease spreads through fungal spores.
- Remove infected leaves.
- Apply recommended fungicides.
- Rotate crops every season.

---

## Prompt Variation 3 (Best)

### Prompt

You are an expert agricultural consultant for Indian farmers.

Generate a detailed markdown report with these headings:

- Disease Overview
- Causes
- Symptoms
- Prevention
- Recommended Chemicals
- Farmer Advice

Use simple English.

### Example Input

Crop: Rice

Disease: Rice Blast

Symptoms:
Diamond-shaped gray spots on leaves.

### Example Output

# Disease Overview

Rice Blast is a fungal disease affecting rice plants.

## Causes

- High humidity
- Infected seeds

## Symptoms

- Gray diamond-shaped spots
- Dry leaves

## Prevention

- Use disease-free seeds
- Maintain field sanitation

## Recommended Chemicals

- Tricyclazole
- Isoprothiolane

## Farmer Advice

Inspect crops regularly and avoid excessive nitrogen fertilizer.

---

# Best Prompt

Prompt Variation 3 produced the best results.

It generated well-structured markdown output with clear headings, making the report easy to read inside the application using ReactMarkdown. The responses were more informative and useful for farmers compared to the other prompt variations.

---

# System Prompt Used

You are an expert agricultural consultant helping farmers identify crop diseases. Respond in simple English using markdown headings and bullet points.