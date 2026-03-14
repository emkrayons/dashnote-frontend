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
      {/* Subtle background texture - MATCHING DASHBOARD */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* NAVBAR - MATCHING DASHBOARD */}
      <nav className="relative z-10 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(-20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="w-7 h-7 bg-gradient-to-br from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2L8 14M2 8L14 8"
                  stroke="white"
                  className="dark:stroke-neutral-900"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-2xl font-light tracking-tight text-neutral-900 dark:text-neutral-100">
                Dashnote
              </h1>
            
            </div>
          </div>

          <div
            className="flex items-center gap-2 md:gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(-20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <ThemeToggle />
            <button
              onClick={() => navigate("/login")}
              className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 px-2 md:px-3 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - MINIMAL & PROFESSIONAL */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-8 py-16 md:py-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
              Notes that work
              <br />
              <span className="text-neutral-400 dark:text-neutral-600">
                the way you think
              </span>
            </h2>
          </div>

          {/* Subheading */}
          <p
            className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            A minimal, fast, and secure note-taking app. Write in markdown,
            organize with tags, and access your notes anywhere.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-3 mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            <button
              onClick={() => navigate("/register")}
              className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-4 rounded-full text-base font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Writing – It's Free
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 px-8 py-4 rounded-full text-base font-medium hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 transform hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          </div>

          {/* Feature Pills - Minimal */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80">
              <svg
                className="w-4 h-4 text-neutral-600 dark:text-neutral-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                100% Free
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80">
              <svg
                className="w-4 h-4 text-neutral-600 dark:text-neutral-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Encrypted & Secure
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80">
              <svg
                className="w-4 h-4 text-neutral-600 dark:text-neutral-400"
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
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Markdown Support
              </span>
            </div>
          </div>

          {/* Features Grid - MATCHING DASHBOARD STYLE */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s",
            }}
          >
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80 text-left hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Fast & Lightweight
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                No bloat. Just pure speed. Start writing instantly with zero
                lag.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80 text-left hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Organize with Tags
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Tag your notes, filter by category, and find what you need in
                seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80 text-left hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Export Anywhere
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Export to PDF or TXT. Your notes, your format, your way.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="relative z-10 text-center text-xs text-neutral-400 dark:text-neutral-600 py-6 border-t border-neutral-200/50 dark:border-neutral-800/50"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s",
        }}
      >
        <p>© {new Date().getFullYear()} Dashnote. All rights reserved.</p>
        <p className="mt-1">
          Built by{" "}
          <a
            href="https://emkrayon.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors font-medium"
          >
            emkrayon
          </a>
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={() => navigate("/terms")}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Terms
          </button>
          <span>•</span>
          <button
            onClick={() => navigate("/privacy")}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Privacy
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
