import http from "../http-common";

const register = async (data) => {
  const res = await http.post("/auth/signup", data);
  return res;
};

const login = async (data) => {
  const res = await http.post("/auth/signin", data);
  if (res.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res;
};

const logout = async () => {
  // const res = await...
  localStorage.removeItem("user");
};

const AuthService = { register, login, logout };

export default AuthService;
