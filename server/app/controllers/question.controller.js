const Question = require("../models/question.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const { authorId, optionOneText, optionTwoText } = req.body;

  const question = await Question.create({
    author: authorId,
    optionOne: {
      text: optionOneText,
    },
    optionTwo: {
      text: optionTwoText,
    },
  });

  res.status(201).json({
    status: "success",
    question,
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    return next(new AppError("Question not found", 404));
  }

  res.status(200).json({
    status: "success",
    question,
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find({});

  res.status(200).json({
    status: "success",
    questions,
  });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { authedUser, answer } = req.body;

  let questionUpdateBlock = {};

  if (answer === "optionOne") {
    questionUpdateBlock = { "optionOne.votes": authedUser };
  } else if (answer === "optionTwo") {
    questionUpdateBlock = { "optionTwo.votes": authedUser };
  }

  const question = await Question.findByIdAndUpdate(id, {
    $push: questionUpdateBlock,
  });

  if (!question) {
    return next(new AppError("Question not found", 404));
  }

  await User.findByIdAndUpdate(authedUser, {
    $push: { answers: { id, answer } },
  });

  res.status(200).json({
    status: "success",
    question,
    authedUser,
    answer,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findByIdAndRemove(id, {
    useFindAndModify: false,
  });

  if (!question) {
    return next(new AppError("Question not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
