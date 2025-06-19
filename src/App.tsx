import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/home";
import AuthCallback from "@/components/AuthCallback";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthDialog from "@/components/AuthDialog";
import Settings from "./components/Settings";

function AppContent() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <AuthDialog isOpen={true} onClose={() => {}} mode="signup" />;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <AppContent />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
