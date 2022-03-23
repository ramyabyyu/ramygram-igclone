import React from "react";
import { Form } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const AuthInput = ({
  name,
  controlId,
  label,
  type,
  placeholder,
  handleChange,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>
        {label}{" "}
        {name === "password" || name === "c_password" ? (
          <span onClick={handleShowPassword}>
            {type === "password" ? <FaEye /> : <FaEyeSlash />}
          </span>
        ) : (
          ""
        )}
      </Form.Label>
      <Form.Control
        name={name}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default AuthInput;
