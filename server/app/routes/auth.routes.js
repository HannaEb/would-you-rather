const { verifySignUp } = require("../middleware");
const auth = require("../controllers/auth.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.post(
    "/auth/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRoleExists],
    auth.signup
  );

  router.post("/auth/signin", auth.signin);

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api", router);
};
