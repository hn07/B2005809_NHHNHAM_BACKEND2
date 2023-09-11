const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to contact book application");
});

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
  const error = new ApiError(404, "Trang không tồn tại");
  return next(error);
});

// handle other errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message: message
  });
});

module.exports = app;
