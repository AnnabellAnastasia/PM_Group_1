import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';

function IsLoggedIn() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URI + "/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(`Error Verifying Authentication - ${err}`);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
