import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Path from "./routeNames";
import { Container } from "react-bootstrap";

// components
import AppNavbar from "./components/AppNavbar";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.AUTH} element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
