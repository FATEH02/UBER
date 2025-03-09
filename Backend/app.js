const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDb = require("./db/db.js");
const app = express();
const userRoutes = require("./Routes/user.routs.js");
const cookieParser = require("cookie-parser");

connectToDb();

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello word");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRoutes);

//export the varibale

module.exports = app;
