const express = require("express");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", auth.signup);

router.post("/signin", auth.signin);

module.exports = router;
