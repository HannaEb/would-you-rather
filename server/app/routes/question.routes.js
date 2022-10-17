const express = require("express");
const questions = require("../controllers/question.controller");
const auth = require("../controllers/auth.controller");

const router = express.Router();

const { authJwt } = require("../middleware");

router
  .route("/")
  .get(auth.verifyToken, questions.getAllQuestions)
  .post(auth.verifyToken, questions.createQuestion);

router
  .route("/:id")
  .get(auth.verifyToken, questions.getQuestion)
  .put(auth.verifyToken, questions.updateQuestion)
  .delete(auth.verifyToken, authJwt.isAdmin, questions.deleteQuestion);

module.exports = router;
