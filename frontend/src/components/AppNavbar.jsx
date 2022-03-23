import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import * as Path from "../routeNames";

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href={Path.HOME} className="brand">
          RamyGram
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={Path.HOME}>Home</Nav.Link>
            <Nav.Link href={Path.AUTH}>Auth</Nav.Link>
            <Nav.Link href={Path.PROFILE}>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
