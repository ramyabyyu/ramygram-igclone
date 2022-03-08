const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

// database connection
connectDB();

const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", require("./routes/userRoute"));

// serve frontend

// routes middlewares
app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server : http://127.0.0.1:${port}`.cyan);
});
