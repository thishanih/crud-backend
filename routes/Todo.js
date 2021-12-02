const express = require("express");
const todoRouter = express.Router();
const todoModel = require("../model/TodoModel");
const { addTodoValidation, updateTodoValidation } = require("../validation");
var moment = require("moment");



todoRouter.post("/addTodo", async (req, res) => {
  const { error } = addTodoValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  var filteredArray = await todoModel.find({ dates: req.body.dates });
  console.log(filteredArray)

  if (filteredArray.length != 0) {
    res.status(400).send("You cannot Add 2 Todo one days");
  } else {
    // Regsiter new Post
    const Todo = new todoModel({
      todoTitle: req.body.todoTitle,
      dates: req.body.dates,
      status: "Noted",
    });

    try {
      const savedTodo = await Todo.save();
      res.json(savedTodo);
    } catch (error) {
      res.json({ message: error });
    }
  }
});



// Display  data

todoRouter.get("/", async (req, res) => {
  try {
    const Todo = await todoModel.find();
    res.json(Todo);
  } catch (err) {
    res.json({ message: error });
  }
});



todoRouter.get("/:TodoId", async (req, res) => {
  try {
    const Todo = await todoModel.findById(req.params.TodoId);
    res.json(Todo);
    console.log("🚀 ~ file: Todo.js ~ line 50 ~ todoRouter.get ~ Todo", Todo);
  } catch (err) {
    // res.json({ message: error });
  }
});

// Delect  data
todoRouter.delete("/delectTodo/:TodoId", async (req, res) => {
  try {
    const todoID = await todoModel.findByIdAndRemove(req.params.TodoId);

    res.json(todoID);
  } catch (error) {
    res.json(error);
  }
});

todoRouter.put("/updateTodo/:TodoId", async (req, res) => {
  const { error } = updateTodoValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updateUpdate = await todoModel.updateOne(
      { _id: req.params.TodoId },
      {
        $set: {
          status: req.body.status,
          todoTitle: req.body.todoTitle,
        },
      }
    );
    res.json(req.body);
    console.log(
      "🚀 ~ file: Todo.js ~ line 84 ~ todoRouter.put ~ req.body",
      req.body
    );
  } catch (error) {
    res.json(error);
  }
});

module.exports = todoRouter;
