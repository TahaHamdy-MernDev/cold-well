const Joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/; // Pattern to validate MongoDB ObjectId
module.exports ={
launchKeys : Joi.object({
    developer: Joi.string().pattern(objectIdPattern).required().messages({
      'string.pattern.base': 'Developer must be a valid MongoDB ObjectId',
      'any.required': 'Developer is a required field'
    }),
    video: Joi.array().items(Joi.string().uri()).messages({
      'array.base': 'Video must be an array',
      'string.uri': 'Each video must be a valid URI'
    }),
    thumbnail: Joi.array().items(Joi.string().uri()).messages({
      'array.base': 'Thumbnail must be an array',
      'string.uri': 'Each thumbnail must be a valid URI'
    }),
    launchDetails: Joi.object({
      en: Joi.string().required().messages({
        'string.base': 'Launch details (English) must be a string',
        'any.required': 'Launch details (English) is a required field'
      }),
      ar: Joi.string().required().messages({
        'string.base': 'تفاصيل الإطلاق (عربي) يجب أن يكون نصًا',
        'any.required': 'تفاصيل الإطلاق (عربي) مطلوب'
      })
    }),
    availableTypes: Joi.array().items(Joi.string().pattern(objectIdPattern).required()).required().messages({
      'array.base': 'Available types must be an array of MongoDB ObjectIds',
      'string.pattern.base': 'Each type must be a valid MongoDB ObjectId'
    }),
    location: Joi.object({
      en: Joi.string().required().messages({
        'string.base': 'Location (English) must be a string',
        'any.required': 'Location (English) is a required field'
      }),
      ar: Joi.string().required().messages({
        'string.base': 'الموقع (عربي) يجب أن يكون نصًا',
        'any.required': 'الموقع (عربي) مطلوب'
      })
    }),
    launchDescription: Joi.object({
      en: Joi.string().required().messages({
        'string.base': 'Launch description (English) must be a string',
        'any.required': 'Launch description (English) is a required field'
      }),
      ar: Joi.string().required().messages({
        'string.base': 'وصف الإطلاق (عربي) يجب أن يكون نصًا',
        'any.required': 'وصف الإطلاق (عربي) مطلوب'
      })
    })
  })
}
