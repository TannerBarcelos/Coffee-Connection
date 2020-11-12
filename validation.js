// Validation for user inputs
const Joi = require('@hapi/joi');

/**
 * This file contains validationfunction to validate inputs for login and registration. We just extracted here instead
 * of doing it locally in each auth route.
 * 
 * See Joi docs
 */

// request data is passed req.body in the auth file in register route
const registerValidation = (reqBodyData) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(reqBodyData); //validate the request body data entries with the schema we require
}

// request data is passed req.body in the auth file in register route
const loginValidation = (reqBodyData) => {
  const schema = Joi.object({
    email:Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(reqBodyData);  //validate the request body data entries with the schema we require
}
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;