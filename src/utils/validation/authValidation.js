const Joi = require('joi');
const passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
const emailPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
module.exports={
    loginKeys :Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            'string.empty': 'Email cannot be empty.',
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
          }),
        password: Joi.string()
          .pattern(passwordPattern)
          .required()
          .messages({
            'string.empty': 'Password cannot be empty.',
            'string.pattern.base': 'please enter a valid password',
            'any.required': 'Password is required.'
          })
      })
      
}

// Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&).