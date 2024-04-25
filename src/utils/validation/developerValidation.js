const Joi = require('joi');
module.exports ={
 createDevKeys : Joi.object({
    name: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Name (English) must be a string',
          'string.empty': 'Name (English) cannot be empty',
          'any.required': 'Name (English) is a required field'
        }),
        ar: Joi.string().required().messages({
          'string.base': 'الاسم (عربي) يجب أن يكون نصًا',
          'string.empty': 'الاسم (عربي) لا يمكن أن يكون فارغًا',
          'any.required': 'الاسم (عربي) هو حقل مطلوب'
        })
      }),
      logoUrl: Joi.array().items(Joi.string().required()).messages({
        'array.base': 'Logo URL must be an array',
        'array.includesRequiredUnknowns': 'All Logo URLs must be strings'
      }),
      description: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Description (English) must be a string',
          'string.empty': 'Description (English) cannot be empty',
          'any.required': 'Description (English) is a required field'
        }),
        ar: Joi.string().required().messages({
          'string.base': 'الوصف (عربي) يجب أن يكون نصًا',
          'string.empty': 'الوصف (عربي) لا يمكن أن يكون فارغًا',
          'any.required': 'الوصف (عربي) هو حقل مطلوب'
        })
      }),
      contact: Joi.object({
        email: Joi.string().email().required().messages({
          'string.email': 'Contact email must be a valid email address',
          'any.required': 'Contact email is a required field'
        }),
        phone: Joi.string().required().messages({
          'string.base': 'Contact phone must be a string',
          'string.empty': 'Contact phone cannot be empty',
          'any.required': 'Contact phone is a required field'
        }),
        website: Joi.string().uri().allow('').messages({
          'string.uri': 'Contact website must be a valid URL'
        })
      }),
      properties: Joi.array().items(Joi.string().required()).messages({
        'array.base': 'Properties must be an array of IDs',
        'array.includesRequiredUnknowns': 'All property IDs must be strings'
      })

})}

