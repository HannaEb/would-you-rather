const { verifySignUp } = require("../middleware");
const auth = require("../controllers/auth.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/auth/signup", [verifySignUp.checkRoleExists], auth.signup);

  router.post("/auth/signin", auth.signin);

  app.use("/api", router);
};
