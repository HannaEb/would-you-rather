import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";
const register = (username, avatar, password) => {
  return axios.post(API_URL + "signup", {
    username,
    avatar,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
};