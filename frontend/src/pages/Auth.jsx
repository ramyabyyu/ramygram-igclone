import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import AuthInput from "../components/AuthInput";

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    c_password: "",
  });

  const { name, username, email, password, c_password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Name */}
      <AuthInput
        label="Name"
        name="name"
        type="text"
        controlId="name"
        placeholder="Enter your name"
        handleChange={handleChange}
        autoFocus
      />
    </Form>
  );
};

export default Auth;
