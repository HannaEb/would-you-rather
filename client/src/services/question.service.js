import http from "../http-common";
import authHeader from "./auth-header";

class QuestionDataService {
  create = (data) => {
    return http.post("/questions", data, { headers: authHeader() });
  };
  get = (id) => {
    return http.get(`/questions/${id}`, { headers: authHeader() });
  };
  getAll = () => {
    return http.get("/questions", { headers: authHeader() });
  };
  update = (id, data) => {
    return http.put(`/questions/${id}`, { data }, { headers: authHeader() });
  };
  delete = (id) => {
    return http.delete(`/questions/${id}`, { headers: authHeader() });
  };
}

export default new QuestionDataService();
