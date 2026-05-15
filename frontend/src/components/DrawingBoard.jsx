import React, { useRef, useState, useEffect } from "react";

export default function DrawingBoard() {
  const canvasRef = useRef(null);
  const resultRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setDrawing(true);
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setDrawing(false);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction("");
  };

  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis && text) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      speechSynthesis.speak(u);
    }
  };

  useEffect(() => {
    if (prediction && !prediction.includes("Error")) {
      speak(prediction);
    }
  }, [prediction]);

  const predictDrawing = async () => {
    const canvas = canvasRef.current;
    setLoading(true);
    setPrediction("");

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setLoading(false);
        setPrediction("Failed to read drawing data.");
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", blob, "drawing.png");
      formData.append("type", "drawing");

      try {
        const response = await fetch("https://hifza-sethi-ai-backend.hf.space/predict", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        const text = `Prediction: ${data.prediction} | Confidence: ${(data.confidence * 100).toFixed(2)}%`;
        setPrediction(text);
        speak(text);
      } catch (err) {
        console.error(err);
        setPrediction(
          "Error connecting to backend. Please ensure the API is running.",
        );
      } finally {
        setLoading(false);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 150);
      }
    }, "image/png");
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Main drawing section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    Interactive Drawing Canvas
                  </h2>
                  <p className="text-blue-100 text-xs">
                    Draw House,tree or umbrella
                  </p>
                </div>
              </div>
            </div>

            {/* Canvas section */}
            <div className="p-4 sm:p-5 bg-gray-50">
              <div className="relative mx-auto" style={{ maxWidth: "380px" }}>
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={380}
                  style={{ touchAction: "none" }}
                  className="w-full h-auto border-4 border-gray-300 rounded-lg shadow-xl bg-gray-900 cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchCancel={stopDrawing}
                  onTouchMove={draw}
                />

                {/* Canvas overlay instruction */}
                {!loading && !prediction && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                      <p className="text-xs font-medium">
                        Draw here with mouse
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Control buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  onClick={predictDrawing}
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-cyan-600`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Predict Drawing
                    </>
                  )}
                </button>

                <button
                  onClick={clearCanvas}
                  disabled={loading}
                  className={`px-4 py-3 bg-white border-2 border-red-300 hover:border-red-500 hover:bg-red-50 rounded-lg font-semibold text-red-600 transition-all shadow-sm flex items-center justify-center gap-2 text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Canvas
                </button>
              </div>

              {/* Drawing tips */}
              <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-cyan-900 mb-1">
                      Drawing Tips
                    </h4>
                    <ul className="text-xs text-cyan-800 space-y-0.5">
                      <li>
                        • Bold, continuous strokes • Center your drawing • Large
                        & clear
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-20">
            {/* Results header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="text-base font-bold text-white">
                  Analysis Results
                </h3>
              </div>
            </div>

            {/* Results content */}
            <div className="p-4" ref={resultRef}>
              {loading ? (
                <div className="text-center py-6">
                  <div className="inline-block w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mb-3"></div>
                  <p className="text-gray-600 font-medium text-sm">
                    Analyzing drawing...
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Running neural network
                  </p>
                </div>
              ) : prediction ? (
                <div className="space-y-3">
                  {/* Prediction display */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                    <div className="text-xs font-semibold text-cyan-700 mb-1">
                      RECOGNITION RESULT
                    </div>
                    <div className="text-lg font-bold text-cyan-900 break-words">
                      {prediction}
                    </div>
                  </div>

                  {/* Success indicator */}
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 border border-green-200">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-900">
                        Analysis Complete
                      </p>
                      <p className="text-xs text-green-700">
                        Voice feedback announced
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium text-sm mb-1">
                    No analysis yet
                  </p>
                  <p className="text-xs text-gray-500">
                    Draw and click predict
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-cyan-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                How to Use
              </h4>
              <ol className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Draw with mouse </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Use bold strokes centered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Click "Predict Drawing"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Listen to voice feedback</span>
                </li>
              </ol>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  <strong>Supported:</strong> Letters, numbers, shapes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
