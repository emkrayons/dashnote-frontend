import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0a0a0a] flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

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
      <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shrink-0">
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div 
            className="mb-8 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4 leading-[1.1]">
              Your thoughts.
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.1]">
              <span className="italic font-serif">Organized.</span>{" "}
              <span className="italic font-serif">Secure.</span>{" "}
              <span className="italic font-serif">Simple.</span>
            </h2>
          </div>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}
          >
            Dashnote helps you create, edit, and manage your personal notes
            securely - anywhere, anytime.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 mb-16 md:mb-24"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
            }}
          >
            <button
              onClick={() => navigate("/register")}
              className="group bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden"
            >
              <span className="relative z-10">Start Writing</span>
              <div className="absolute inset-0 bg-linear-to-r from-neutral-700 to-neutral-800 dark:from-neutral-200 dark:to-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:border-neutral-900 dark:hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transform hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          </div>

          {/* Features Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
            }}
          >
            <div className="group p-8 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors duration-500">
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">Focus First</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">Distraction-free interface designed for deep thinking and writing.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors duration-500">
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">Secure & Private</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">Your notes are encrypted and protected, accessible only by you.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors duration-500">
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="relative z-10 text-center text-sm text-neutral-400 dark:text-neutral-600 py-8 
        md:py-10 border-neutral-200/50 dark:border-neutral-800/50"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s'
        }}
      >
        <p>© {new Date().getFullYear()} Dashnote. All rights reserved.</p>
        <p>Designed and Developed by emkrayon</p>
      </footer>
    </div>
  );
};

export default Home;
