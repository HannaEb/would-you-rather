const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

module.exports = (app) => {
  // Serve the client build directory for production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/", "build")));
    // Compress all HTTP responses
    app.use(compression());
  }

  // Cors for cross origin allowance
  app.use(cors());

  // Set security HTTP headers
  app.use(helmet());

  // Body parser, reading data from body into req.body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against cross-site scripting
  app.use(xss());
};
