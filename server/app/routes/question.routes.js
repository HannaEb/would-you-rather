const express = require("express");
const questions = require("../controllers/question.controller");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/")
  .get(auth.verifyToken, questions.getAllQuestions)
  .post(auth.verifyToken, questions.createQuestion);

router
  .route("/:id")
  .get(auth.verifyToken, questions.getQuestion)
  .patch(auth.verifyToken, questions.updateQuestion)
  .delete(auth.verifyToken, auth.restrictTo("admin"), questions.deleteQuestion);

module.exports = router;
