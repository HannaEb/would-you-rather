const express = require("express");
const users = require("../controllers/user.controller");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.route("/").get(auth.verifyToken, users.getAllUsers);

module.exports = router;
