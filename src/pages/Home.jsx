import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0a0a0a] flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Animated gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 dark:from-pink-600/10 dark:to-orange-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="relative z-10 px-4 md:px-12 py-4 md:py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shrink-0 shadow-lg">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="md:w-4 md:h-4">
                <path d="M8 2L8 14M2 8L14 8" stroke="white" className="dark:stroke-neutral-900" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-lg md:text-2xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
              Dashnote
            </h1>
          </div>

          <div 
            className="flex items-center gap-2 md:gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            <ThemeToggle />
            <button
              onClick={() => navigate("/login")}
              className="text-xs md:text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 px-2 md:px-3 py-2 whitespace-nowrap"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-base font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-12 py-12 md:py-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: Text Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <div 
                className="mb-6 md:mb-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 leading-[1.1]">
                  Your thoughts.
                </h2>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 italic font-serif">
                    Organized.
                  </span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 italic font-serif">
                    Secure.
                  </span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-600 to-yellow-600 dark:from-pink-400 dark:via-orange-400 dark:to-yellow-400 italic font-serif">
                    Simple.
                  </span>
                </h2>
              </div>

              {/* Subheading */}
              <p 
                className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
                }}
              >
                Dashnote helps you create, edit, and manage your personal notes securely - anywhere, anytime. Experience note-taking that just works.
              </p>

              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 mb-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
                }}
              >
                <button
                  onClick={() => navigate("/register")}
                  className="group relative bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-4 rounded-full text-base font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Writing Free
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 px-8 py-4 rounded-full text-base font-medium hover:border-neutral-900 dark:hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transform hover:scale-105 transition-all duration-300"
                >
                  Login
                </button>
              </div>

              {/* Social Proof */}
              <div
                className="flex items-center justify-center lg:justify-start gap-6 text-sm text-neutral-500 dark:text-neutral-400"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>No Limits</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Illustration */}
            <div 
              className="relative animate-float"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
              }}
            >
              {/* Main Illustration */}
              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background glow */}
                  <circle cx="200" cy="200" r="150" fill="url(#heroGlow)" opacity="0.3"/>
                  
                  {/* Floating notes */}
                  <g className="animate-float" style={{ animationDelay: '0s' }}>
                    <rect x="80" y="120" width="120" height="140" rx="12" fill="url(#noteGradient1)" stroke="currentColor" strokeWidth="2" className="text-neutral-300 dark:text-neutral-700" filter="url(#shadow)"/>
                    <line x1="95" y1="145" x2="185" y2="145" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <line x1="95" y1="165" x2="165" y2="165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <line x1="95" y1="185" x2="175" y2="185" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                  </g>

                  <g className="animate-float" style={{ animationDelay: '0.5s' }}>
                    <rect x="200" y="100" width="120" height="140" rx="12" fill="url(#noteGradient2)" stroke="currentColor" strokeWidth="2" className="text-neutral-300 dark:text-neutral-700" filter="url(#shadow)"/>
                    <line x1="215" y1="125" x2="305" y2="125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <line x1="215" y1="145" x2="285" y2="145" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <line x1="215" y1="165" x2="295" y2="165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <circle cx="305" cy="115" r="8" fill="#FBBF24"/>
                  </g>

                  <g className="animate-float" style={{ animationDelay: '1s' }}>
                    <rect x="140" y="180" width="120" height="140" rx="12" fill="url(#noteGradient3)" stroke="currentColor" strokeWidth="2" className="text-neutral-300 dark:text-neutral-700" filter="url(#shadow)"/>
                    <line x1="155" y1="205" x2="245" y2="205" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <line x1="155" y1="225" x2="225" y2="225" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                    <line x1="155" y1="245" x2="235" y2="245" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400 dark:text-neutral-600" opacity="0.5"/>
                  </g>

                  {/* Sparkles */}
                  <g className="animate-pulse-slow">
                    <circle cx="70" cy="100" r="4" fill="url(#sparkle1)"/>
                    <circle cx="330" cy="280" r="3" fill="url(#sparkle2)"/>
                    <circle cx="90" cy="300" r="3.5" fill="url(#sparkle3)"/>
                    <circle cx="320" cy="120" r="3" fill="url(#sparkle1)"/>
                  </g>

                  {/* Pencil */}
                  <g className="animate-float" style={{ animationDelay: '0.3s' }}>
                    <rect x="280" y="240" width="60" height="10" rx="5" fill="url(#pencilGradient)" transform="rotate(45 280 240)"/>
                    <circle cx="318" cy="278" r="6" fill="#FFB800"/>
                  </g>

                  <defs>
                    <linearGradient id="heroGlow" x1="0" y1="0" x2="400" y2="400">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4"/>
                      <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#F472B6" stopOpacity="0.4"/>
                    </linearGradient>

                    <linearGradient id="noteGradient1" x1="80" y1="120" x2="200" y2="260">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
                      <stop offset="100%" stopColor="#f8f9fa" stopOpacity="0.9"/>
                    </linearGradient>

                    <linearGradient id="noteGradient2" x1="200" y1="100" x2="320" y2="240">
                      <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95"/>
                      <stop offset="100%" stopColor="#fde68a" stopOpacity="0.9"/>
                    </linearGradient>

                    <linearGradient id="noteGradient3" x1="140" y1="180" x2="260" y2="320">
                      <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.95"/>
                      <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.9"/>
                    </linearGradient>

                    <linearGradient id="pencilGradient">
                      <stop offset="0%" stopColor="#FFC107"/>
                      <stop offset="100%" stopColor="#FFB800"/>
                    </linearGradient>

                    <radialGradient id="sparkle1">
                      <stop offset="0%" stopColor="#60A5FA"/>
                      <stop offset="100%" stopColor="#A78BFA"/>
                    </radialGradient>

                    <radialGradient id="sparkle2">
                      <stop offset="0%" stopColor="#A78BFA"/>
                      <stop offset="100%" stopColor="#F472B6"/>
                    </radialGradient>

                    <radialGradient id="sparkle3">
                      <stop offset="0%" stopColor="#F472B6"/>
                      <stop offset="100%" stopColor="#FB923C"/>
                    </radialGradient>

                    <filter id="shadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
                    </filter>

                    <style>
                      {`
                        @keyframes pulse-slow {
                          0%, 100% { opacity: 0.4; }
                          50% { opacity: 1; }
                        }
                        .animate-pulse-slow {
                          animation: pulse-slow 3s ease-in-out infinite;
                        }
                      `}
                    </style>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Features Grid - Below Hero */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s'
            }}
          >
            <div className="group p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:shadow-xl hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">Focus First</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">Distraction-free interface designed for deep thinking and writing.</p>
            </div>

            <div className="group p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:shadow-xl hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">Secure & Private</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">Your notes are encrypted and protected, accessible only by you.</p>
            </div>

            <div className="group p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:shadow-xl hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">Lightning Fast</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">Instant sync across all devices. Your notes, always ready.</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer 
        className="relative z-10 text-center text-sm text-neutral-400 dark:text-neutral-600 py-8 md:py-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s'
        }}
      >
        <p>© {new Date().getFullYear()} Dashnote. All rights reserved.</p>
        <p className="mt-1">Designed and Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">emkrayon</span></p>
      </footer>
    </div>
  );
};

export default Home;
