const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const questionRouter = require("./question.routes");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/questions", questionRouter);
};
