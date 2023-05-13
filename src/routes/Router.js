import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

export const Router = () => {
  const LazyHome = lazy(() => import("../pages/home/Home.js"));

  function ProtectedRoutes({ children }) {
    const getToken = localStorage.getItem("Labeddit-token");
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
              <Suspense fallback={<CircularProgress sx={{ position: "absolute", right: "50%", top: "50%" }} />}>
                <LazyHome />
              </Suspense>
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
