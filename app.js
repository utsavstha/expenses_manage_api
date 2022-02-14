const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const ticketCommentRoutes = require("./routes/ticketCommentRoutes");
const boardRoutes = require("./routes/boardRoutes");
const classificationRoutes = require("./routes/classificationRoutes");
const priorityRoutes = require("./routes/priorityRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const globalErrHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const app = express();

// app.use(express.static("files"));
console.log(__dirname);
// app.use(express.static(`${__dirname}/files`));

//For file uploads
// app.use(fileUpload({ createParentPath: true }));

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "15kb",
  })
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use("/public", express.static(__dirname + "/public"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/board", boardRoutes);
app.use("/api/v1/classification", classificationRoutes);
app.use("/api/v1/priority", priorityRoutes);
app.use("/api/v1/ticket", ticketRoutes);
app.use("/api/v1/ticketComment", ticketCommentRoutes);

// handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;
