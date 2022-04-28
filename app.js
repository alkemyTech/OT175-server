const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const organizationsRouter = require("./routes/organizations");
const membersRouter = require("./routes/members");
const testimonialsRouter = require("./routes/testimonials");
const categoriesRouter = require("./routes/category");
const newsRouter = require("./routes/news");
const activitiesRouter = require("./routes/activities");
const contactsRouter = require("./routes/contacs");
const imageUploadRouter = require("./routes/imageUpload");


const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/organization", organizationsRouter);
app.use("/members", membersRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/categories", categoriesRouter);
app.use("/news", newsRouter);
app.use("/activities", activitiesRouter);
app.use("/", contactsRouter);
app.use("/imageUpload", imageUploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
