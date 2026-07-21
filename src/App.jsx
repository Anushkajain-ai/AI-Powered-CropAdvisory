import { useState } from "react";
import "./App.css";
import { logoutUser } from "./api/authApi";
import ReactMarkdown from "react-markdown";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  fetchCropDisease,
  analyzeDisease,
} from "./api/cropApi";

import Button from "./components/ui/Button";
import Loader from "./components/ui/Loader";
import Modal from "./components/ui/Modal";
import Toast from "./components/ui/Toast";
import CropManager from "./components/CropManager";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function CropDiseasePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // =======================
  // STATES
  // =======================

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [showManager, setShowManager] = useState(false);

  // Backend Data

  const [disease, setDisease] = useState("");
  const [description, setDescription] = useState("");

  const [cause, setCause] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [control, setControl] = useState([]);
  const [chemical, setChemical] = useState([]);
  const [prevention, setPrevention] = useState([]);
  const [aiReport, setAiReport] = useState("");

  // =======================
  // DISEASE DATA
  // =======================

  const cropDiseases = {
    Tomato: [
      {
        name: "Late Blight",
        symptoms: "Dark brown water-soaked spots on leaves and fruits."
      },
      {
        name: "Early Blight",
        symptoms: "Brown circular spots with ring-like patterns on older leaves."
      },
      {
        name: "Fusarium Wilt",
        symptoms: "Yellowing and wilting of lower leaves."
      },
      {
        name: "Leaf Mold",
        symptoms: "Yellow patches with mold underneath leaves."
      },
      {
        name: "Bacterial Spot",
        symptoms: "Small dark spots on leaves and fruits."
      }
    ],

    Potato: [
      {
        name: "Late Blight",
        symptoms: "Dark lesions on leaves and rotting tubers."
      },
      {
        name: "Early Blight",
        symptoms: "Brown concentric rings on leaves."
      },
      {
        name: "Potato Scab",
        symptoms: "Rough corky patches on potato skin."
      },
      {
        name: "Black Scurf",
        symptoms: "Black fungal patches on potato surface."
      }
    ],

    Rice: [
      {
        name: "Rice Blast",
        symptoms: "Diamond-shaped gray spots on leaves."
      },
      {
        name: "Bacterial Blight",
        symptoms: "Yellowing from leaf tips that spreads downward."
      },
      {
        name: "Brown Spot",
        symptoms: "Brown oval spots on leaves."
      },
      {
        name: "Sheath Blight",
        symptoms: "Large green-gray lesions on leaf sheaths."
      }
    ],

    Wheat: [
      {
        name: "Stem Rust",
        symptoms: "Reddish-brown powdery pustules on stems."
      },
      {
        name: "Leaf Rust",
        symptoms: "Orange-brown spots mainly on leaves."
      },
      {
        name: "Powdery Mildew",
        symptoms: "White powder-like coating on leaves."
      },
      {
        name: "Loose Smut",
        symptoms: "Black powder replacing wheat grains."
      }
    ],

    Maize: [
      {
        name: "Northern Corn Leaf Blight",
        symptoms: "Long cigar-shaped gray lesions."
      },
      {
        name: "Corn Smut",
        symptoms: "Large swollen galls on ears and leaves."
      },
      {
        name: "Gray Leaf Spot",
        symptoms: "Long rectangular gray lesions."
      },
      {
        name: "Common Rust",
        symptoms: "Small reddish-brown pustules on leaves."
      }
    ]
  };

  const selectedDiseaseInfo =
    cropDiseases[selectedCrop]?.find(
      (item) => item.name === selectedDisease
    );

  // =======================
  // IMAGE UPLOAD
  // =======================
    const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // =======================
  // REMOVE IMAGE
  // =======================

const removeImage = () => {
  setFile(null);
  setPreview(null);
  setAiReport("");
};

  // =======================
  // PREDICT
  // =======================

const handlePredict = async () => {

  if (!file) {
    setShowToast(true);
    return;
  }

  if (!selectedCrop) {
    alert("Please select a crop.");
    return;
  }

  if (!selectedDisease) {
    alert("Please select a disease.");
    return;
  }

  setLoading(true);

  try {

    // Fetch disease information from MongoDB
    const data = await fetchCropDisease(selectedCrop);

    if (!data || data.length === 0) {
      alert("No disease data found.");
      setLoading(false);
      return;
    }

    const crop =
      data.find(
        (item) =>
          item.disease.toLowerCase() ===
          selectedDisease.toLowerCase()
      ) || data[0];

    // Fill existing modal data
    setDisease(crop.disease);
    setDescription(crop.description);
    setCause(crop.cause || []);
    setSymptoms(crop.symptoms || []);
    setControl(crop.control || []);
    setChemical(crop.chemical || []);
    setPrevention(crop.prevention || []);

    // Ask AI for a detailed report
// Ask AI for a detailed report
try {
  const ai = await analyzeDisease(
    selectedCrop,
    selectedDisease,
    selectedDiseaseInfo?.symptoms || ""
  );

  setAiReport(ai.response);
} catch (err) {
  console.error("AI Error:", err);
  setAiReport("AI report could not be generated.");
}

setShowModal(true);

  } catch (err) {

    console.error(err);
    alert("Unable to connect to backend.");

  }

  setLoading(false);
};

  // =======================
  // UI
  // =======================

  return (
    <>
          <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setShowManager(false)}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
          }}
        >
          🌱 Disease Detection
        </button>

        <button
          onClick={() => setShowManager(true)}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
          }}
        >
          🌾 Crop Manager
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {showManager ? (
        <CropManager />
      ) : (
        <div className={`app ${darkMode ? "dark" : "light"}`}>
          <h1>🌱 Crop Disease Detection</h1>

          <div className="form-box">
            <button
              className="toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <label>Select Crop</label>

            <select
  value={selectedCrop}
  onChange={(e) => {
setSelectedCrop(e.target.value);
setSelectedDisease("");
setFile(null);
setPreview(null);
setAiReport("");
  }}
>
              <option value="">Choose Crop</option>
              <option>Tomato</option>
              <option>Potato</option>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Maize</option>
            </select>

            <label>Select Disease</label>
                        <select
              value={selectedDisease}
              onChange={(e) => {
  setSelectedDisease(e.target.value);
  setAiReport("");
}}
              disabled={!selectedCrop}
            >
              <option value="">
                {selectedCrop
                  ? "Choose Disease"
                  : "Select Crop First"}
              </option>

              {selectedCrop &&
                cropDiseases[selectedCrop].map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
            </select>

            {selectedDiseaseInfo && (
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "20px",
                  padding: "15px",
                  background: darkMode ? "#2b2b2b" : "#f4fff4",
                  border: "1px solid #4CAF50",
                  borderRadius: "10px",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    color: "#2e7d32",
                  }}
                >
                  🔍 Symptoms Preview
                </h3>

                <strong>{selectedDisease}</strong>

                <p
                  style={{
                    marginTop: "10px",
                    lineHeight: "1.6",
                  }}
                >
                  {selectedDiseaseInfo.symptoms}
                </p>

                <small
                  style={{
                    color: darkMode ? "#ccc" : "#666",
                  }}
                >
                  Select an image of your crop to confirm whether it matches these symptoms.
                </small>
              </div>
            )}
                        <div className="upload-box">
              {preview ? (
                <>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={removeImage}
                  >
                    ✕
                  </button>

                  <img
                    src={preview}
                    alt="preview"
                    className="preview-image"
                  />
                </>
              ) : (
                <label htmlFor="fileInput">
                  <p>📷 Upload a clear crop image</p>
                  <span>Click or drag & drop</span>
                </label>
              )}

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </div>

            {loading && (
              <Loader text="🤖 AI is analyzing your crop image..." />
            )}

            <Button
              text="Predict Disease"
              onClick={handlePredict}
            />

            {showToast && (
              <Toast
                message="Please upload an image first!"
                onClose={() => setShowToast(false)}
              />
            )}

            {showModal && (
              <Modal
  onClose={() => {
    setShowModal(false);
    setAiReport("");
  }}
>
                <h2
                  style={{
                    color: "#2e7d32",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  🌿 Crop Disease Report
                </h2>

                <hr />

                <h3>🦠 Disease</h3>

                <p>
                  <strong>{disease}</strong>
                </p>

                <h3>📖 Description</h3>

                <p>{description}</p>
                                <h3>❓ Why does it occur?</h3>

                <ul>
                  {cause.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>🔍 Symptoms</h3>

                <ul>
                  {symptoms.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>✅ How to Control It</h3>

                <ul>
                  {control.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>🧪 Recommended Chemicals / Fungicides</h3>

                <ul>
                  {chemical.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>🛡 Prevention Tips</h3>

                <ul>
                  {prevention.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <hr />

<h2
  style={{
    marginTop: "30px",
    color: "#2e7d32",
  }}
>
  🤖 AI Detailed Report
</h2>

<div className="ai-report">
  <ReactMarkdown>{aiReport}</ReactMarkdown>
</div>
                              </Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
}
function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CropDiseasePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;