const { authJwt } = require("../middleware");
const questions = require("../controllers/question.controller.js");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/questions/", questions.create);
  router.get("/questions/", questions.findAll);
  router.get("/questions/:id", questions.findOne);
  router.put("/questions/:id", questions.update);
  router.delete("/questions/:id", [authJwt.isAdmin], questions.delete);

  app.use("/api", router);
};
