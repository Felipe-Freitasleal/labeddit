import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";

export const Router = () => {
  const getToken = localStorage.getItem("Labeddit-token");
  function ProtectedRoutes({ children }) {
    if (!getToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<p> 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
};
