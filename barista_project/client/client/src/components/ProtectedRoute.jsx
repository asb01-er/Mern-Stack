import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/auth/verify",
          { withCredentials: true } // ✅ send cookie
        );

        if (data.success) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  // While checking auth, optionally show loading
  if (isAuthenticated === null) return <p>Loading...</p>;

  // Redirect if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Render protected children
  return children;
};

export default ProtectedRoute;
