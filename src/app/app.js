const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const photosRoutes = require("./routes/photos.routes");
const app = express();

// Config
app.set("port", process.env.PORT || 3000);

// Middlewares
app
  .use(cors())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/photos", photosRoutes);

// public statics
app.use("/uploads", express.static(path.resolve("uploads")));

module.exports = app;
