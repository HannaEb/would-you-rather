import http from "../http-common";
import authHeader from "./auth-header";

const getAll = async () => {
  const res = await http.get("/users", { headers: authHeader() });
  return res;
};

const UserService = { getAll };

export default UserService;
