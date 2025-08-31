import React, { useState } from "react";
import axios from "axios";

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || "https://httpbin.org/post";
// If you run a local server, set REACT_APP_UPLOAD_URL=http://localhost:4000/upload in .env

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");
      const response = await axios.post(UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = total ? Math.round((loaded * 100) / total) : 0;
          setProgress(percent);
        },
        timeout: 0, // optional: prevent axios default timeout if large files
      });

      // For httpbin response: response.data will contain info.
      setMessage("✅ Upload successful!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. " + (err.message || ""));
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800); // reset progress shortly after
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>📤 File Upload with Progress</h2>

      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginLeft: 12,
          padding: "8px 14px",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        Upload
      </button>

      {/* Progress bar */}
      <div style={{ marginTop: 18 }}>
        <div style={{
          width: "100%",
          height: 22,
          background: "#e9e9e9",
          borderRadius: 6,
          overflow: "hidden",
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2ecc71",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            transition: "width 200ms ease",
          }}>
            {progress > 0 ? `${progress}%` : ""}
          </div>
        </div>
      </div>

      {/* Message */}
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
};

export default FileUpload;
