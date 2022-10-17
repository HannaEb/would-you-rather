const express = require("express");
const users = require("../controllers/user.controller.js");

const router = express.Router();

router.route("/").get(users.getAllUsers);

module.exports = router;
