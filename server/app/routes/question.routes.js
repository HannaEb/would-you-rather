const { authJwt } = require("../middleware");
const questions = require("../controllers/question.controller.js");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/questions/", [authJwt.verifyToken], questions.create);
  router.get("/questions/", [authJwt.verifyToken], questions.findAll);
  router.get("/questions/:id", [authJwt.verifyToken], questions.findOne);
  router.put("/questions/:id", [authJwt.verifyToken], questions.update);
  router.delete("/questions/:id", [authJwt.isAdmin], questions.delete);

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api", router);
};
