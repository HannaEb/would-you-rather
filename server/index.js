// Exit application in case of uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception, shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Require app
const app = require("./app");

// Set up server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Shut down server in case of unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection, shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
