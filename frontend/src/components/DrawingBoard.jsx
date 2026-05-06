import React, { useRef, useState, useEffect } from "react";

export default function DrawingBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Fill dark background
    ctx.fillStyle = "#ffffff // slate-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    // Calculate scale in case displayed size differs from internal resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction("");
  };

  const speak = (text) => {
    if (window.speechSynthesis && text) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    }
  };

  useEffect(() => {
    if (prediction && !prediction.includes("Error")) {
      // Extract just the prediction part for speaking if the string is long
      const textToSpeak = prediction
        .split("|")[0]
        .replace("Prediction:", "")
        .trim();
      speak(textToSpeak);
    }
  }, [prediction]);

  const predictDrawing = async () => {
    const canvas = canvasRef.current;
    setLoading(true);
    setPrediction("");

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setLoading(false);
        setPrediction("Failed to read canvas.");
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
        const text = `Prediction: ${data.prediction} | ${(data.confidence * 100).toFixed(1)}%`;
        setPrediction(text);
      } catch (err) {
        console.error(err);
        setPrediction("API Connection Error");
      } finally {
        setLoading(false);
      }
    }, "image/png");
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-3 p-2 lg:p-3 overflow-hidden">
      {/* Canvas Area */}
      <div
        className="flex-1 relative bg-slate-800 rounded-xl overflow-hidden shadow-xl flex items-center justify-center p-2"
        ref={containerRef}
      >
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          className="w-full h-full max-w-2xl max-h-2xl object-contain bg-slate-900 rounded cursor-crosshair touch-none shadow-inner"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          onTouchMove={draw}
        />
        {!loading && !prediction && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shrink-0">
          <h3 className="font-bold text-sm flex items-center gap-2">
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Analysis
          </h3>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500">Analyzing drawing...</p>
            </div>
          ) : prediction ? (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-[10px] uppercase tracking-wide text-blue-500 font-bold mb-1">
                  Result
                </p>
                <div className="text-xl font-bold text-blue-900 break-words leading-tight">
                  {prediction}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 p-2.5 rounded-lg border border-green-100">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs text-green-800 font-medium">
                  Voice feedback active
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 opacity-60">
              <svg
                className="w-10 h-10 mx-auto text-gray-300 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <p className="text-xs text-gray-500">Draw and click predict</p>
            </div>
          )}
        </div>

        {/* Controls Stack */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2 shrink-0">
          <button
            onClick={predictDrawing}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Predict</>
            )}
          </button>
          <button
            onClick={clearCanvas}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-red-600 hover:text-red-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            Clear Canvas
          </button>
          <p className="text-[10px] text-center text-slate-400">
            Use bold strokes
          </p>
        </div>
      </div>
    </div>
  );
}
