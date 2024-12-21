import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Random.css";
import Loading from "./Loading";

function Randomprompt() {
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [logoChoice, setLogoChoice] = useState("logo.png");
  const [illustrationChoice, setIllustrationChoice] = useState("no");
  const navigate = useNavigate();

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = false;

  useEffect(() => {
                document.title = "Brightways - Tasks";
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePdfChange = (event) => setPdfFile(event.target.files[0]);
  const handleImageChange = (event) => setImageFile(event.target.files[0]);
  const handlePromptChange = (event) => setPrompt(event.target.value);
  const handleLogoChange = (event) => setLogoChoice(event.target.value);
  
  const handleIllustrationChange = (event) => setIllustrationChoice(event.target.value);

  const handleVoiceInput = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitting(true);

    const formData = new FormData();
    if (pdfFile) formData.append("notes", pdfFile);
    if (imageFile) formData.append("image", imageFile);
    formData.append("prompt", prompt || "English");
    formData.append("logoChoice", logoChoice);
    formData.append("illustrationChoice", illustrationChoice);
    fetch("https://random-prompt.onrender.com/upload", {
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
        navigate("/responsetwo", { state: { pdfUrl: url } });
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
      <div className="container_ra">
        <h1 className="titlekk_ra">
          <span className="word_ra">User&nbsp;</span>
          <span className="word_ra">Task&nbsp;</span>
          <span className="word_ra">Solver :</span>
        </h1>
        <form onSubmit={handleSubmit} className="form_ra">
          <label className="label_ra">
            Upload Your PDF (optional):
            <input type="file" accept="application/pdf" onChange={handlePdfChange} className="input-file_ra" />
          </label>
          <br />
          <label className="label_ra">
            Upload an Image (optional):
            <input type="file" accept="image/*" onChange={handleImageChange} className="input-file_ra" />
          </label>
          <br />
          <label className="label_ra">
            Enter Your Prompt:
            <div className="inputy-container_ra">
              <input
                type="textf"
                id="prompt"
                name="prompt"
                placeholder="Enter Your Prompt Here"
                value={prompt}
                onChange={handlePromptChange}
                className="inputtt-text_ra"
              />
              <button type="button" onClick={handleVoiceInput} className="voice-input-button_ra">
                <img src="https://res.cloudinary.com/dnsjdvzdn/image/upload/v1730542034/mic2-removebg-preview_peomtn.png" alt="Mic" className="mic-icon_ra" />
              </button>
            </div>
          </label>
          <br />
          <label className="labelX_ra">
            Select a watermark on PDF:
            <select value={logoChoice} onChange={handleLogoChange} className="inputX-select_ra">
              <option value="logo.png">Color</option>
              <option value="logo2.png">None</option>
              <option value="logo4.png">B-W</option>
            </select>
          </label>
          <br />

          <div className="labelX_ra">
            Would you like illustrations in the PDF?
            <div>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={illustrationChoice === "yes"}
                  onChange={handleIllustrationChange}
                />
                Yes
              </label>&nbsp;&nbsp;
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={illustrationChoice === "no"}
                  onChange={handleIllustrationChange}
                />
                No
              </label>
            </div>
          </div>
          <br />
          
          <button type="submit" className="submit-buttonnx_ra" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        {submitting && <div id="loading" className="loading-spinner_ra"></div>}
      </div>
    </div>
  );
}

export default Randomprompt;
