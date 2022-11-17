const logout = async () => {
  // const res = await...
  localStorage.removeItem("user");
};

const AuthService = { logout };

export default AuthService;
