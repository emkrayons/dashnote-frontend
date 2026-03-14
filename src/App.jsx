import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";  
import ResetPassword from "./pages/ResetPassword";  
import Terms from "./pages/Terms";  
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

// ⭐ Import analytics wrapper
import AnalyticsWrapper from "./components/AnalyticsWrapper";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        {/* ⭐ Analytics wrapper INSIDE BrowserRouter */}
        <AnalyticsWrapper />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/login"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;