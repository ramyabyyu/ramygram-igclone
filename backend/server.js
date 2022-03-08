const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config();

// database connection
connectDB();

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server : http://127.0.0.1:${port}`.cyan);
});
