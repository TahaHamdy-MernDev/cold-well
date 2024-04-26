const express = require("express");
const app = express();
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const routes = require("../routes");
let logger = require("morgan");

const cookieParser = require("cookie-parser");
const path =require("path");

const {
  corsOptions,
  mongoSanitizeOptions,
  helmetOptions,
  rateLimitOptions,
} = require("./options");
global.__basedir = path.resolve(__dirname, '.');
const session = require("express-session");
//template engine

app.use(require("../utils/response/responseHandler"));

app.use(cors(corsOptions));

app.use(logger("dev"));

app.use(cookieParser());
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: false, limit: "30mb" }));
// app.use(xss());
// app.use(hpp());

app.use(mongoSanitize(mongoSanitizeOptions));
// app.use(helmet(helmetOptions));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use("/cold-well/v1", routes);
app.use('/uploads', express.static(path.join(__basedir, 'uploads')));


app.use("*", (req, res) => {
  return res.recordNotFound("Route");
});
function errorHandler(error, req, res, next) {
    console.log(error);
    return res.internalServerError({ data: { message: error.message } });
  }
module.exports = app;
