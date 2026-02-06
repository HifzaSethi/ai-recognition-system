import React, { useState } from "react";
import SignLanguage from "./components/SignLanguage";
import DrawingBoard from "./components/DrawingBoard";

export default function App() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white relative overflow-y-auto">
        {/* Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg mb-4 animate-float">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-1 tracking-tight">
                AI Vision Lab
              </h1>
              <p className="text-sm text-gray-400">
                Advanced Machine Learning Recognition
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setMode("sign")}
                className="group w-full relative bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-purple-500/50 rounded-2xl p-4 text-left transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                      Sign Language
                    </h3>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300">
                      Real-time gesture recognition
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => setMode("drawing")}
                className="group w-full relative bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-500/50 rounded-2xl p-4 text-left transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                      Drawing
                    </h3>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300">
                      Recognize shapes & digits
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                System Ready
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View (Active Mode)
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              {mode === "sign" ? "Sign Language" : "Drawing Board"}
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">
              AI Vision Lab
            </p>
          </div>
        </div>

        <button
          onClick={() => setMode(null)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="hidden sm:inline">Exit</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {mode === "sign" && <SignLanguage />}
        {mode === "drawing" && <DrawingBoard />}
      </main>
    </div>
  );
}
//   const [mode, setMode] = useState(null);

//   if (!mode) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//         {/* Animated background elements */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//           <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
//         </div>

//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

//         <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
//           {/* Header section */}
//           <div className="text-center mb-8 max-w-4xl mx-auto">
//             {/* AI Icon */}
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-2xl mb-4 animate-float">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//               </svg>
//             </div>

//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
//               AI Vision Lab
//             </h1>
//             <p className="text-base sm:text-lg text-gray-300 mb-2 font-light">
//               Advanced Machine Learning Recognition System
//             </p>
//             <p className="text-sm text-gray-400 max-w-2xl mx-auto">
//               Real-time sign language interpretation and drawing recognition
//             </p>
//           </div>

//           {/* Mode selection cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl px-4">
//             {/* Sign Language Card */}
//             <button
//               onClick={() => setMode("sign")}
//               className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02]"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

//               <div className="relative">
//                 {/* Icon */}
//                 <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
//                   <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
//                   </svg>
//                 </div>

//                 <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
//                   Sign Language
//                 </h3>
//                 <p className="text-gray-300 text-sm mb-4">
//                   Real-time hand gesture recognition using computer vision
//                 </p>

//                 {/* Features */}
//                 <div className="space-y-1.5 text-left mb-4">
//                   <div className="flex items-center text-gray-300 text-xs sm:text-sm">
//                     <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Live webcam detection
//                   </div>
//                   <div className="flex items-center text-gray-300 text-xs sm:text-sm">
//                     <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Voice feedback system
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-white/10">
//                   <span className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors flex items-center justify-center text-sm">
//                     Launch Module
//                     <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </span>
//                 </div>
//               </div>
//             </button>

//             {/* Drawing Recognition Card */}
//             <button
//               onClick={() => setMode("drawing")}
//               className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02]"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

//               <div className="relative">
//                 {/* Icon */}
//                 <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
//                   <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                   </svg>
//                 </div>

//                 <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
//                   Drawing Recognition
//                 </h3>
//                 <p className="text-gray-300 text-sm mb-4">
//                   Intelligent pattern recognition for hand-drawn shapes
//                 </p>

//                 {/* Features */}
//                 <div className="space-y-1.5 text-left mb-4">
//                   <div className="flex items-center text-gray-300 text-xs sm:text-sm">
//                     <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Interactive drawing canvas
//                   </div>
//                   <div className="flex items-center text-gray-300 text-xs sm:text-sm">
//                     <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Touch & mouse support
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-white/10">
//                   <span className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors flex items-center justify-center text-sm">
//                     Launch Module
//                     <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </span>
//                 </div>
//               </div>
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="mt-8 text-center">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-gray-300 text-xs sm:text-sm">System Online</span>
//             </div>
//             <p className="mt-3 text-gray-500 text-xs">
//               Powered by TensorFlow • Real-time Processing • Privacy First
//             </p>
//           </div>
//         </div>

//         {/* Custom animations */}
//         <style jsx>{`
//           @keyframes blob {
//             0%, 100% { transform: translate(0, 0) scale(1); }
//             33% { transform: translate(30px, -50px) scale(1.1); }
//             66% { transform: translate(-20px, 20px) scale(0.9); }
//           }
//           @keyframes float {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-10px); }
//           }
//           .animate-blob {
//             animation: blob 7s infinite;
//           }
//           .animation-delay-2000 {
//             animation-delay: 2s;
//           }
//           .animation-delay-4000 {
//             animation-delay: 4s;
//           }
//           .animate-float {
//             animation: float 3s ease-in-out infinite;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
//       {/* Professional header */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-base sm:text-lg font-bold text-gray-900">
//                   {mode === "sign" ? "Sign Language Recognition" : "Drawing Recognition"}
//                 </h1>
//                 <p className="text-xs text-gray-500 hidden sm:block">AI Vision Lab</p>
//               </div>
//             </div>

//             <button
//               onClick={() => setMode(null)}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               <span className="hidden sm:inline">Back to Menu</span>
//               <span className="sm:hidden">Back</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//         {mode === "sign" && <SignLanguage />}
//         {mode === "drawing" && <DrawingBoard />}
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//             <p className="text-xs text-gray-600">
//               © 2024 AI Vision Lab. Advanced Machine Learning Systems.
//             </p>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-xs text-gray-600">Models Active</span>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
