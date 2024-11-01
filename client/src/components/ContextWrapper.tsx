import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchProfile } from "../utils/userAPI";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export const UserContext = createContext({
  user: {
    id: "",
    firstName: "",
    lastName: "",
    image: "",
  },
  setUser: (value: any) => {},
});
export const AlertContext = createContext({
  pageAlert: {
    error: "",
		success: ""  
	},
  setPageAlert: (value: any) => {},
});

export default function ContextWrapper() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    image: "",
  });

  const [pageAlert, setPageAlert] = useState({
    error: "",
		success: ""
  });

	// Keep user in context state as long as user is signed in using UseEffect
  useEffect(() => {
    const getLoggedInUser = async () => {
      let user = await fetchProfile();
      if (!user) {
        user = {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
        };
      }
      console.log("fetchProfile ", user);
      setUser(user);
    };
    getLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AlertContext.Provider value={{ pageAlert, setPageAlert }}>
        <Navbar />
        <Outlet />
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}
