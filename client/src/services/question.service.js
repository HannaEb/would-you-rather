import http from "../http-common";
import authHeader from "./auth-header";

const get = async (id) => {
  const res = await http.get(`/questions/${id}`, { headers: authHeader() });
  return res;
};

const QuestionService = {
  get,
};

export default QuestionService;
