const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server : http://127.0.0.1:${port}`.cyan);
});
