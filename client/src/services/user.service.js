import http from "../http-common";

const getAll = async () => {
  const res = await http.get("/users");
  return res;
};

const UserService = { getAll };

export default UserService;
