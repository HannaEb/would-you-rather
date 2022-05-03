import http from "../http-common";

class AuthDataService {
  register = (username, avatar, password) => {
    return http.post("/auth/signup", {
      username,
      avatar,
      password,
    });
  };
  login = (username, password) => {
    return http
      .post("/auth/signin", {
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
  logout = () => {
    localStorage.removeItem("user");
  };
}

export default new AuthDataService();
