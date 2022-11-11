const AppError = require("./../utils/appError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate value: ${value}. Please choose another value`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };

    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDuplicateFields(err);
    if (err.name === "ValidationError") error = handleValidationError(err);

    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      console.error("ERROR", error);
      res.status(500).json({
        status: "error",
        message: "Oops, something went wrong",
      });
    }
  }
};
