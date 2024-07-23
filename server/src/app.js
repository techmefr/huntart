const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const corsOptions = {
  origin: config.allowedOrigins,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (à implémenter plus tard)
// app.use('/api', require('./routes/apiRoutes'));

app.use(errorHandler);

module.exports = app;
