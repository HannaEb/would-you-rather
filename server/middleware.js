const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

module.exports = (app) => {
  // Serve the client build directory for production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/", "build")));
  }

  // Body parser, reading data from body into req.body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set security HTTP headers
  app.use(helmet());

  // Cors for cross origin allowance
  app.use(cors());
};
