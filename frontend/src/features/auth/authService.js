import axios from "axios";

import * as API from "../../helper/apiUrl";

// register
const register = async (userData) => {
  const response = await axios.post(API.REGISTER, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login
const login = async (userData) => {
  const response = await axios.post(API.LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data;
};

// logout
const logout = async () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;
