import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Score.css";
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
      <div className="container__new">
        <h1 className="titlekk__new">
          <span className="word__new">Enhance&nbsp;</span>
          <span className="word__new">Begins&nbsp;</span>
          <span className="word__new">Here :</span>
        </h1>
        <p>For The Children With Special Needs</p>
        <br></br>
        <form onSubmit={handleSubmit} className="form__new">
          <label className="label__new">
            Upload Your Notes (PDF only):
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="input-file__new"
            />
          </label>
          <br />
          <label className="label__new">
            Upload an Image (optional):
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-file__new"
            />
          </label>
          <br />
          <label className="label__new">
            Enter Your Language Preferences (optional, default is English):
            <br></br>
            <br></br>
            <input
              type="textF"
              id="prompt"
              name="prompt"
              placeholder="Enter Your Language Here"
              value={prompt}
              onChange={handlePromptChange}
              className="yoyotwo__new"
            />
          </label>
          <br />
          <button
            type="submit"
            className="submit-buttonn__new"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {submitting && <div id="loading" className="loading-spinner__new"></div>}
      </div>
    </div>
  );
}

export default Score;
