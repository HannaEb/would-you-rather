import http from "../http-common";

class QuestionDataService {
  create = (data) => {
    return http.post("/questions", data);
  };
  get = (id) => {
    return http.get(`/questions/${id}`);
  };
  getAll = () => {
    return http.get("/questions");
  };
  update = (id, data) => {
    return http.put(`/questions/${id}`, { data });
  };
  delete = (id) => {
    return http.delete(`/questions/${id}`);
  };
}

export default new QuestionDataService();
