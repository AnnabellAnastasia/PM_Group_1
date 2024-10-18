import React from "react";
import { Router, RouterProvider, Routes, createBrowserRouter, replace } from "react-router-dom";

// Page Components
import ContextWrapper from "./components/ContextWrapper";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import PostFeed from "./components/PostFeed/PostFeed";
// Authentication Wrapper
import IsLoggedIn from "./components/Auth/IsLoggedIn";
// CSS
import "./App.css";
import Account from "./components/Account/Account";


const router = createBrowserRouter([
  {
    path: "/",
		element: <ContextWrapper />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <IsLoggedIn />,
        children: [
          {
            path: "posts",
            element: <PostFeed />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
