import { useState } from "react";
import "./App.css";

import Input from "./components/ui/Input";
import Button from "./components/ui/Button";
import Loader from "./components/ui/Loader";
import Modal from "./components/ui/Modal";
import Toast from "./components/ui/Toast";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Upload image
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Remove image
  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  // Predict logic
  const handlePredict = () => {
    if (!file) {
      setShowToast(true);
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      setResult("Late Blight detected in plant leaf");
      setShowModal(true);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Crop Disease Detection</h1>

      <div className="form-box">

        {/* Crop Selection */}
        <label>Select Crop</label>
        <select>
          <option value="">Choose Crop</option>
          <option>Tomato</option>
          <option>Potato</option>
          <option>Rice</option>
          <option>Wheat</option>
          <option>Maize(corn)</option>
        </select>

        {/* Disease Selection */}
        <label>Select Disease</label>
        <select>
          <option value="">Select the problem</option>
          <option>Stem Rust: Breaksing of stem and stopping of grain formation.</option>
          <option>Powdery Mildew: Blocks sunlight absorption and weakens the plant.</option>
          <option>Rice Blast: Kills leaves and snaps the grain heads.</option>
          <option>Bacterial Blight: Dries out leaves and kills the whole plant.</option>
          <option>Late Blight: Rots fruits and leaves into a black slime.</option>
          <option>Fusarium Wilt: Blocks water flow and starves the plant completely.</option>
          <option>Early Blight: Kills leaves early and shrinks the potato size.</option>
          <option>Potato Scab: Ruins the skin with rough, unmarketable sores.</option>
          <option>Northern Corn Leaf Blight: Destroys leaf tissue and slashes grain yield.</option>
          <option>Corn Smut: Replaces corn kernels with large, swollen fungal tumors.</option>
        </select>

        {/* Upload Box */}
        <div className="upload-box">
          {preview ? (
            <>
              <button className="remove-btn" onClick={removeImage}>
                ✕
              </button>

              <img src={preview} alt="preview" className="preview-image" />
            </>
          ) : (
            <label htmlFor="fileInput">
              <p>📁 Upload your image</p>
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

        {/* Loader */}
        {loading && <Loader text="Analyzing image..." />}

        {/* Predict Button (NOW USING COMPONENT → CLEAN UI) */}
        <Button text="Predict Disease" onClick={handlePredict} />

        {/* Toast */}
        {showToast && (
          <Toast
            message="Please upload an image first!"
            onClose={() => setShowToast(false)}
          />
        )}

        {/* Modal */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2>Prediction Result</h2>

            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              {result}
            </p>
          </Modal>
        )}

      </div>
    </div>
  );
}

export default App;