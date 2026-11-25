import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute  from "./components/ProtectedRoute";
import StartInterview from "./pages/StartInterview";
import InterviewSession from "./pages/InterviewSession";
import InterviewSummary from "./pages/InterviewSummary";
import ReviewInterview from "./pages/ReviewInterview";
import Favorites from "./pages/Favorites";
import Hero from "./pages/Hero";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/start-interview"
            element={
              <ProtectedRoute>
                <StartInterview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id/session"
            element={
              <ProtectedRoute>
                <InterviewSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id/summary"
            element={
              <ProtectedRoute>
                <InterviewSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id/review"
            element={
                <ProtectedRoute>
                    <ReviewInterview />
                </ProtectedRoute>
            }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;