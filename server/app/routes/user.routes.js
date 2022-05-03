const users = require("../controllers/user.controller.js");
const router = require("express").Router();

module.exports = (app) => {
  router.get("/users/", users.findAll);

  app.use("/api", router);
};
