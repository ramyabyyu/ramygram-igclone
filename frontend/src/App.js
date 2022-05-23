import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Path from "./routeNames";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import AppNavbar from "./components/AppNavbar";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import PostForm from "./pages/PostForm";

const App = () => {
  return (
    <React.Fragment>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.AUTH} element={<Auth />} />
          <Route path={Path.PROFILE} element={<Profile />} />
          <Route path={Path.POSTFORM} element={<PostForm />} />
        </Routes>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
