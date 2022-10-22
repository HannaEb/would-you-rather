// Set up dotenv
const dotenv = require("dotenv");
dotenv.config();

// Require Express
const express = require("express");

// Start up an instance of the app
const app = express();

require("./database");
require("./middleware")(app);
require("./app/routes")(app);

module.exports = app;
