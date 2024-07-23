require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000"],
};
