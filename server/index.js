//config
require("dotenv").config();
require("express-async-errors");

//security
const helmet = require("helmet");
const xssclean = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");

//app
const express = require("express");
const connectDB = require("./db/connectdb");

//middlewares
const errorHandler = require("./middlewares/error-handler");
const authentication = require("./middlewares/authentication");
const routeNotFound = require("./middlewares/route-not-found");

//routers/routes
// const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const logger = require("./middlewares/logger");
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 120,
  })
);
app.use(express.json());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "example.com"],
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(xssclean());

if (process.env.NODE_ENV === "production") {
  app.use(logger);
  app.use("/", express.static("./client/build"));
} else {
  app.use(cors());
}

app.get("/api/v1", (req, res) => {
  res.send("Social Media Web App Server ver. 1.0.0a");
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.redirect("/");
  });
}

app.use(routeNotFound);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server listening on port:" + port);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
