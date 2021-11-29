const mongoose = require("mongoose");

const Todo_Schema = mongoose.Schema({
  todoTitle: {
    type: String,
    require: true,
  },
  dates: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("todo", Todo_Schema);