import { useState } from "react";
import "./App.css";
import { logoutUser } from "./api/authApi";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { fetchCropDisease } from "./api/cropApi";

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

    setLoading(true);

    try {
      const data = await fetchCropDisease(selectedCrop);

      if (data.length === 0) {
        alert("No disease data found.");
        setLoading(false);
        return;
      }

      const crop = data[0];

      setDisease(crop.disease);
      setDescription(crop.description);
      setCause(crop.cause);
      setSymptoms(crop.symptoms);
      setControl(crop.control);
      setChemical(crop.chemical);
      setPrevention(crop.prevention);

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
      <div style={{ textAlign: "center", marginTop: "20px" }}>

  <button
    onClick={() => setShowManager(false)}
    style={{
      marginRight: "10px",
      padding: "10px 20px"
    }}
  >
    🌱 Disease Detection
  </button>


  <button
    onClick={() => setShowManager(true)}
    style={{
      marginRight: "10px",
      padding: "10px 20px"
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
      cursor: "pointer"
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
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option value="">Choose Crop</option>
              <option>Tomato</option>
              <option>Potato</option>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Maize</option>
            </select>

            <label>Select Disease</label>

            <select>
              <option>Select the problem</option>
              <option>Stem Rust</option>
              <option>Powdery Mildew</option>
              <option>Rice Blast</option>
              <option>Bacterial Blight</option>
              <option>Late Blight</option>
              <option>Fusarium Wilt</option>
              <option>Early Blight</option>
              <option>Potato Scab</option>
              <option>Northern Corn Leaf Blight</option>
              <option>Corn Smut</option>
            </select>

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
                  <p>📁 Upload your image</p>
                  <span>Click or drag &amp; drop</span>
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
              <Loader text="🔍 Analyzing crop image..." />
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
              <Modal onClose={() => setShowModal(false)}>
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