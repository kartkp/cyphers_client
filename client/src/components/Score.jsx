import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Kk.css";
import Loading from "./Loading";

function Score() {
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.title = "Brightways - Enhancer";
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePdfChange = (event) => setPdfFile(event.target.files[0]);

  const handleImageChange = (event) => setImageFile(event.target.files[0]);

  const handlePromptChange = (event) => setPrompt(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    if (pdfFile) formData.append("notes", pdfFile);
    if (imageFile) formData.append("image", imageFile);
    formData.append("prompt", prompt || "English");

    fetch("https://server-deploy-nw8p.onrender.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) return response.blob();
        throw new Error("Error generating PDF");
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setSubmitting(false);
        navigate("/response", { state: { pdfUrl: url } });
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container">
        <h1 className="titlekk">
        <span className="word">Enhance&nbsp;</span>
          <span className="word">Begins&nbsp;</span>
          <span className="word">Here :</span>
        </h1>
        <p>For The Children With Special Needs</p>
        <br></br>
        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Upload Your Notes (PDF only):
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="input-file"
            />
          </label>
          <br />
          <label className="label">
            Upload an Image (optional):
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-file"
            />
          </label>
          <br />
          <label className="label">
            Enter Your Language Preferences (optional, default is English):
            <br></br>
            <br></br>
            <input
              type="text"
              id="prompt"
              name="prompt"
              placeholder="Enter Your Language Here"
              value={prompt}
              onChange={handlePromptChange}
              className="input-text"
            />
          </label>
          <br />
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {submitting && <div id="loading" className="loading-spinner"></div>}
      </div>
    </div>
  );
}

export default Score;
