const Joi = require("joi");

const addTodoValidation = (data) => {
  const Todo_Schema = Joi.object({
    todoTitle: Joi.string().min(10).max(200).required(),
    // dates:Joi.date().format('YYYY-MM-DD'),
    dates: Joi.string().required(),
  });

  return Todo_Schema.validate(data);
};

const updateTodoValidation = (data) => {
  const Todo_Schema = Joi.object({
    todoTitle: Joi.string().min(10).max(200).required(),
    status: Joi.string().required(),
    dates: Joi.string().required(),
  });

  return Todo_Schema.validate(data);
};

module.exports.addTodoValidation = addTodoValidation;
module.exports.updateTodoValidation = updateTodoValidation;
