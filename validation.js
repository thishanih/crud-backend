const Joi = require("joi");

const addTodoValidation = (data) => {
  const Todo_Schema = Joi.object({
    todoTitle: Joi.string().min(10).max(100).required(),
    // dates:Joi.date().format('YYYY-MM-DD'),
    dates: Joi.string().required(),
  });

  return Todo_Schema.validate(data);
};

const updateTodoValidation = (data) => {
  const Todo_Schema = Joi.object({
    todoTitle: Joi.string().min(10).max(100).required(),
    status: Joi.string().required(),
    // dates: Joi.string().required(),
  });

  return Todo_Schema.validate(data);
};

// User register Validation

const registrationUserValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(2).required().email(),
    phone_number: Joi.number().min(2).required(),
    password: Joi.string().min(6).required(),
  });

  return userSchema.validate(data);
};

// User Login Validation

const loginValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return userSchema.validate(data);
};

module.exports.addTodoValidation = addTodoValidation;
module.exports.updateTodoValidation = updateTodoValidation;
module.exports.registrationUserValidation = registrationUserValidation;
module.exports.loginValidation = loginValidation;
