const express = require("express");
const morgan = require("morgan");
const path = require("path");
//const cors = require("cors");
//const corsOptions = require("./libs/cors");
const photosRoutes = require("./routes/photos.routes");
const app = express();

// Config
app.set("port", process.env.PORT || 3000);

// Middlewares
app
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  })
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/photos", photosRoutes);

// public statics
app.use("/uploads", express.static(path.resolve("uploads")));

module.exports = app;
