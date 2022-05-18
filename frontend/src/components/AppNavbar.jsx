import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import * as Path from "../routeNames";
import ConfirmModal from "./ConfirmModal";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
            {user && (
              <Link to={Path.PROFILE} className="nav-link">
                Profile
              </Link>
            )}
          </Nav>
          <div className="d-flex ms-auto">
            {user ? (
              <>
                <Button variant="dark" onClick={handleShow}>
                  Logout
                </Button>
                <ConfirmModal
                  modalTitle="Logout"
                  modalBody="Are you sure want to logout?"
                  handleConfirm={handleLogout}
                  handleClose={handleClose}
                  show={show}
                />
              </>
            ) : (
              <Link to={Path.AUTH} className="btn btn-dark">
                Sign In
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
