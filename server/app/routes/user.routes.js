const users = require("../controllers/user.controller.js");
const router = require("express").Router();

module.exports = (app) => {
  router.get("/users/", users.findAll);

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api", router);
};
