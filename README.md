# 🌱 Crop Disease Detection Website

A React.js-based web application that helps farmers identify crop diseases by selecting a crop, choosing a disease/problem, and uploading an image of the affected plant.

---

## 🚀 Features

- 🌾 Select Crop from a dropdown menu
- 🦠 Select Disease/Problem from a dropdown menu
- 📸 Upload crop images from gallery or camera
- 🖼️ Image preview before prediction
- ❌ Remove uploaded image and upload a new one
- 🎨 Modern UI with transparent glass-effect design
- 🌿 Agriculture-themed background

---

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- CORS
- Dotenv

---

## 📂 Project Structure

```text
crop-disease-app
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── data
│   ├── app.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── public
│
├── src
│   ├── components
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Frontend Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crop-disease-app.git
```

### 2. Navigate to the project folder

```bash
cd crop-disease-app
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Start the frontend

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

---

# 🔧 Backend API (Week 4)

The project also contains a REST API built using **Node.js** and **Express.js**.

## Backend Features

- ✅ Get all crops
- ✅ Get a single crop
- ✅ Add a new crop
- ✅ Update crop information
- ✅ Delete a crop
- ✅ Search crops

---

## 📁 Backend Folder Structure

```text
backend
│
├── controllers
├── routes
├── middleware
├── data
├── app.js
├── package.json
├── .env
├── .env.example
└── .gitignore
```

---

## ▶️ How to Run Backend Locally

### Step 1

Open a terminal or Command Prompt.

### Step 2

Navigate to the backend folder.

```bash
cd backend
```

### Step 3

Install all dependencies.

```bash
npm install
```

### Step 4

Create a `.env` file inside the backend folder.

Add the following:

```text
PORT=5000
```

### Step 5

Start the backend server.

```bash
npm run dev
```

You should see:

```text
Server running on port 5000
```

Backend URL:

```text
http://localhost:5000
```

---

# 📌 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/crops` | Get all crops |
| GET | `/api/crops/:id` | Get crop by ID |
| POST | `/api/crops` | Add a new crop |
| PUT | `/api/crops/:id` | Update an existing crop |
| DELETE | `/api/crops/:id` | Delete a crop |
| GET | `/api/crops/search?crop=Tomato` | Search crops |

---

## 📸 Current Functionality

- Users can choose a crop.
- Users can select a disease/problem.
- Users can upload crop images.
- Uploaded images are previewed within the upload area.
- Images can be removed and replaced before submission.
- REST API supports complete CRUD operations.
- Crop records can be searched using the search endpoint.

---

## 🔮 Future Enhancements

- AI-based disease prediction using Machine Learning
- Connect frontend directly to backend API
- Disease treatment recommendations
- Farmer-friendly multilingual support
- Database integration (MongoDB/MySQL)
- User authentication
- Prediction history
- Cloud deployment

---

## 🎯 Project Goal

The goal of this project is to provide farmers with an easy-to-use platform for crop disease identification and management, helping improve crop health and agricultural productivity.

---

## 👩‍💻 Author

**Anushka Jain**

Engineering Student | AI Enthusiast