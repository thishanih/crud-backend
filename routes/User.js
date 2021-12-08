const express = require("express");
const userRouter = express.Router();
const userModel = require("../model/UserModel");
const bencrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registrationUserValidation,
  loginValidation,
} = require("../validation");

userRouter.post("/addUser", async (req, res) => {
  // Validate the Add Users
  const { error } = registrationUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check email exists
  const emailExists = await userModel.findOne({ email: req.body.email });

  // get email already error message
  if (emailExists) return res.status(400).send("Email Already Exists");

  // Hash Password
  const salt = await bencrypt.genSalt(10);
  const hashPassword = await bencrypt.hash(req.body.password, salt);

  // Regsiter new user
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

userRouter.post("/login", async (req, res) => {
  // Validate the Login Users
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await userModel.findOne({ email: req.body.email });

  if (!userExists) return res.status(400).send("Invalid Email or Password");

  const passCheck = await bencrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!passCheck) return res.status(400).send("Invalid password");

  // Set Token
  const token = jwt.sign({ _id: userExists.id }, process.env.TOKEN_SECRET);

  // // Add to Header
  res.header("auth-token", token);
  res.status(200).json({
    message: "SuccessFully Logged In",
    userExists,
    token,
  });
});

module.exports = userRouter;
