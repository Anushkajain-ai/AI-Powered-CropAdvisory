import { useState } from "react";
const removeImage = () => {
  setFile(null);
  setPreview(null);
};
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };
  
  
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="container">
      <h1>Crop Disease Detection</h1>

      <div className="form-box">
        <label>Select Crop</label>
        <select>
          <option value="">Choose Crop</option>
          <option>Tomato</option>
          <option>Potato</option>
          <option>Rice</option>
          <option>Wheat</option>
          <option>Maize(corn)</option>
        </select>

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
                <span>Click or drag & drop</span>
              </label>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handleImageUpload}
            />
          </div>
      

        <button>Predict Disease</button>
      </div>
    </div>
  );
}

export default App;