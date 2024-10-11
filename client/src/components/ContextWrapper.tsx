import { createContext, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { fetchProfile } from '../utils/userAPI';
import Navbar from "./Navbar/Navbar";

export const UserContext = createContext({
	user: {
		id: "",
		firstName: "",
		lastName: "",
		image: ""
	},
	setUser: (value:any) => {},
});

export default function ContextWrapper() {
	const [user, setUser] = useState({
		id: "",
		firstName: "",
		lastName: "",
		image: ""
	});

  useEffect(() => {
		const getLoggedInUser = async () => {
			let user = await fetchProfile();
			console.log("fetchProfile ", user);
			if (!user) {
				user = {
					id: "",
					firstName: "",
					lastName: "",
					image: ""
				}
			} 
			console.log("fetchProfile ", user);
			setUser(user);
		}
		getLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Navbar />
      <Outlet />
    </UserContext.Provider>
  );
}
