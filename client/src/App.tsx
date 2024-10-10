import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import PostFeed from "./components/PostFeed/PostFeed";
import "./App.css";


const router = createBrowserRouter([
  {
    path: "/",
		errorElement: <Error />,
		children: [
			{ 
				index: true,
				element: <Home />
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "signup",
				element: <SignUp />
			},
			{
				path: "posts",
				element: <PostFeed />
			}
		]
  }
]);

function App() {
  return (
    <>
      <Navbar />
			<RouterProvider router={router} />
    </>
  );
}

export default App;
