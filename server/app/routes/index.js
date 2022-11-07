const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const questionRouter = require("./question.routes");
const AppError = require("../utils/appError");
const errorHandler = require("../controllers/error.controller");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/questions", questionRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found`, 404));
  });

  app.use(errorHandler);
};
