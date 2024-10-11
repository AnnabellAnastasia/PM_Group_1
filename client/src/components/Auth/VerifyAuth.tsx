import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';

function VerifyAuth() {
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

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
          setLoading(false);
        } else {
          setLoading(false);
					setRedirecting(true);
        }
      } catch (err) {
        console.error(`Error Verifying Authentication - ${err}`);
				setLoading(false);
				setRedirecting(true);
      }
    }
    checkAuth();
  }, []);

	if (loading) {
		return <></>;
	} 
	if (redirecting) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;

}

export default VerifyAuth;
