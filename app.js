const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRouter = require("./routes/Todo");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/todo", todoRouter); 

const dbConfig = require("./config/config.js");

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log("Sever Connected port 5000");
  });