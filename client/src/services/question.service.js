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
    console.log("Service", data);
    return http.put(`/questions/${id}`, { data });
  };
  // update = (data) => {
  //   console.log("Service", data);
  //   console.log("Id type", typeof data[id]);
  //   return http.put(`/questions/${data[id]}`, data.uthedUser, data.answer);
  // };
}

export default new QuestionDataService();
