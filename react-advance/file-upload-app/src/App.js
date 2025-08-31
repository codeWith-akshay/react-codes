import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  // File select karne ka handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setMessage("");
  };

  // File upload ka handler
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://httpbin.org/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setMessage("✅ File uploaded successfully!");
    } catch (error) {
      setMessage("❌ File upload failed!");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>File Upload with Progress Bar</h2>

      {/* File Input */}
      <input type="file" onChange={handleFileChange} />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        style={{ marginLeft: "10px", padding: "5px 15px" }}
      >
        Upload
      </button>

      {/* Progress Bar */}
      {progress > 0 && (
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            height: "20px",
            border: "1px solid #000",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "green",
              textAlign: "center",
              color: "white",
            }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Success / Error Message */}
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

export default App;
