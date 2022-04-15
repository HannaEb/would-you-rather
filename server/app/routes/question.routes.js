module.exports = (app) => {
  const questions = require("../controllers/question.controller.js");
  var router = require("express").Router();
  router.post("/questions/", questions.create);
  router.get("/questions/", questions.findAll);
  router.get("/questions/:id", questions.findOne);
  router.put("/questions/:id", questions.update);

  app.use("/api", router);
};
