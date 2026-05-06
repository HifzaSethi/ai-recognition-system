import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function SignLanguage() {
  const webcamRef = useRef(null);
  const resultRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const stopCamera = useCallback(() => {
    try {
      const stream = webcamRef.current?.stream;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const toggleCamera = () => {
    if (cameraOn) {
      stopCamera();
      setCameraOn(false);
    } else {
      setCameraOn(true);
      setCameraError(false);
    }
  };

  const captureAndPredict = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setPrediction("Camera access error");
      setConfidence(null);
      return;
    }

    let blob;
    try {
      const res = await fetch(imageSrc);
      blob = await res.blob();
    } catch (err) {
      setPrediction("Image capture failed");
      return;
    }

    const formData = new FormData();
    formData.append("file", blob, "webcam_image.jpg");
    formData.append("type", "sign");

    setLoading(true);
    setPrediction(null);

    try {
      const res = await axios.post("https://hifza-sethi-ai-backend.hf.space/predict", formData, {
        timeout: 10000,
      });
      setPrediction(res.data.prediction);
      setConfidence((res.data.confidence * 100).toFixed(1));
    } catch (err) {
      setPrediction("Connection Error");
      setConfidence(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      prediction &&
      !prediction.includes("Error") &&
      !prediction.includes("failed") &&
      window.speechSynthesis
    ) {
      const utterance = new SpeechSynthesisUtterance(prediction);
      utterance.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [prediction]);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-3 p-2 lg:p-3 overflow-hidden">
      {/* Camera Viewport - Takes available space */}
      <div className="flex-1 relative bg-black rounded-xl overflow-hidden shadow-xl flex flex-col group">
        {cameraOn ? (
          <>
            <div className="absolute inset-3">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover rounded-lg"
                videoConstraints={{
                  facingMode: "user",
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                }}
                onUserMediaError={() => setCameraError(true)}
              />
            </div>
            {/* Compact Overlay Guides */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 border border-purple-400/30 rounded-lg relative">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-purple-400"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-purple-400"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-purple-400"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-purple-400"></div>
              </div>
            </div>
            {/* Recording Indicator */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>{" "}
              LIVE
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12 mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">Camera Off</span>
          </div>
        )}

        {/* Floating Controls on Bottom of Video */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center gap-3">
          <button
            onClick={captureAndPredict}
            disabled={loading || !cameraOn}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>{" "}
                Predict
              </>
            )}
          </button>
          <button
            onClick={toggleCamera}
            className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition-colors"
          >
            {cameraOn ? (
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
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            ) : (
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
        </div>
        {cameraError && (
          <div className="absolute top-3 left-3 right-3 bg-red-500/90 backdrop-blur text-white text-xs px-3 py-2 rounded shadow-lg flex items-center gap-2">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Camera permission denied
          </div>
        )}
      </div>

      {/* Sidebar / Results Panel - Fixed width on desktop, bottom sheet on mobile */}
      <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shrink-0">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Analysis
          </h3>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500">Processing gesture...</p>
            </div>
          ) : prediction ? (
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 text-center">
                <p className="text-[10px] uppercase tracking-wide text-purple-500 font-bold mb-1">
                  Result
                </p>
                <div className="text-2xl font-bold text-purple-900">
                  {prediction}
                </div>
                {confidence && (
                  <div className="mt-2 w-full bg-purple-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                )}
                {confidence && (
                  <p className="text-[10px] text-purple-600 mt-1 text-right">
                    {confidence}% confidence
                  </p>
                )}
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
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                />
              </svg>
              <p className="text-xs text-gray-500">Ready to predict</p>
            </div>
          )}
        </div>

        {/* Compact Footer Instructions */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500">
          <p>Tip: Center hand in frame with good lighting.</p>
        </div>
      </div>
    </div>
  );
}
