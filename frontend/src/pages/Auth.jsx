import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import AuthInput from "../components/AuthInput";
import Loader from "../components/Loader";

const Auth = () => {
  const initialStateFormData = {
    name: "",
    username: "",
    email: "",
    password: "",
    c_password: "",
  };
  const [formData, setFormData] = useState(initialStateFormData);

  const { name, username, email, password, c_password } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialStateFormData);
    setShowPassword(false);
    setIsRegister(!isRegister);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = {};

    if (isRegister) {
      if (password !== c_password) {
        toast.error("Password confirmation does not match!");
      } else {
        userData = {
          name,
          email,
          username,
          password,
          c_password,
        };

        dispatch(register(userData));
      }
    } else {
      userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs={12} md={12} xl={8}>
          <h3 className="text-center">
            {isRegister ? "Create new account" : "Login"}
          </h3>
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            {isRegister && (
              <AuthInput
                label="Name"
                name="name"
                type="text"
                controlId="name"
                placeholder="Enter your name"
                handleChange={handleChange}
                autoFocus
              />
            )}

            {/* Username */}
            {isRegister && (
              <AuthInput
                label="Username"
                name="username"
                type="text"
                controlId="username"
                placeholder="Create an username"
                handleChange={handleChange}
              />
            )}

            {/* Email */}
            <AuthInput
              label="Email Address"
              name="email"
              type="email"
              controlId="email"
              placeholder="Enter your email"
              handleChange={handleChange}
              autoFocus
            />

            {/* Password */}
            <AuthInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              controlId="password"
              placeholder={
                isRegister ? "Choose a password" : "Enter your password"
              }
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />

            {/* Confirm Password */}
            {isRegister && (
              <AuthInput
                label="Confirm Password"
                name="c_password"
                type="password"
                controlId="c_password"
                placeholder="Repeat your password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}

            {/* Switch isRegister */}
            <Button variant="link" className="mb-3" onClick={switchMode}>
              {isRegister
                ? "Already have an account? Login here!"
                : "Don't have an account? Register here!"}
            </Button>

            <Button variant="primary" type="submit">
              {isRegister ? "Create" : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
