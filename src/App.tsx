import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";
import SubscriptionPage from "./components/SubscriptionPage";
import BillingPage from "./components/BillingPage";
import TermsOfService from "./components/legal/TermsOfService";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import routes from "tempo-routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated
    // This is a placeholder - replace with actual auth check
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <LandingPage />}
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <SettingsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/subscription"
            element={
              isAuthenticated ? (
                <SubscriptionPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/billing"
            element={
              isAuthenticated ? (
                <BillingPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
