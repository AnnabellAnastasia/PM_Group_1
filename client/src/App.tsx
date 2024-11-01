import React from "react";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Page Components
import ContextWrapper from "./components/ContextWrapper";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import PostFeed from "./components/PostFeed/PostFeed";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Social from "./components/Social/Social";
import Contact from "./components/Contact/Contact";
import Account from "./components/Account/Account";
//import SearchBar from "./components/SearchBar/Searchbar";

// Authentication Wrapper
import IsLoggedIn from "./components/Auth/IsLoggedIn";
// CSS
import "./App.css";
import ChatModal from "./components/Chat/ChatRoom";

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
          {
            path: "about",
            element: <About />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "social",
            element: <Social />,
          },
          {
            path: "contact",
            element: <Contact />,
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
          {
            path: "account",
            element: <Account />,
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
