import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Page Components
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import PostPage from "./components/Post/PostPage";
// Authentication Wrapper
import VerifyAuth from "./components/Auth/VerifyAuth";
// CSS
import "./App.css";
import ChatRoom from "./components/Chat/ChatRoom";


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
				path: "/chat",
				element: <ChatRoom />
			}
		]
  },
  {
		element: <VerifyAuth />,
		children: [
			{
				path: "posts",
				element: <PostPage />
			}
		]
  },

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
