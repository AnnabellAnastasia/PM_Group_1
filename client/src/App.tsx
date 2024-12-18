import React from "react";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Page Components
import ContextWrapper from "./components/ContextWrapper";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Social from "./components/Social/Social";
import Contact from "./components/Contact/Contact";
import Account from "./components/Account/Account";
import Footer from "./components/Footer/Footer";
import Group from "./components/Group/Group";
import GroupPage from './components/Group/GroupPage'; 
import MainPage from "./components/MainPage/MainPage";

// Authentication Wrapper
import IsLoggedIn from "./components/Auth/IsLoggedIn";
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


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
            path: "contact",
            element: <Contact />,
          },
          {
            path: "account/:userID",
            element: <Account />,
          },
          {
            path: "group",
            element: <Group />,
          },
          {
            path: "group/:groupId",
            element: <GroupPage />,
          },

        ],
      },
      {
        element: <IsLoggedIn />,
        children: [
          {
            path: "posts",
            element: <MainPage />,
          },
          {
            path: "social",
            element: <Social />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
