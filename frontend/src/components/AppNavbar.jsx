import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Path from "../routeNames";

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Link to={Path.HOME} className="brand navbar-brand">
          RamyGram
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={Path.HOME} className="nav-link">
              Home
            </Link>
            <Link to={Path.AUTH} className="nav-link">
              Auth
            </Link>
            <Link to={Path.PROFILE} className="nav-link">
              Profile
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
