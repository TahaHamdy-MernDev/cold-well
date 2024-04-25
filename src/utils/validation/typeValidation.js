const Joi = require("joi");
module.exports = {
  typeKeys: Joi.object({
    name: Joi.object({
      en: Joi.string().required().messages({
        "string.base": "Name (English) must be a string",
        "string.empty": "Name (English) cannot be empty",
        "any.required": "Name (English) is a required field",
      }),
      ar: Joi.string().required().messages({
        "string.base": "الاسم (عربي) يجب أن يكون نصًا",
        "string.empty": "الاسم (عربي) لا يمكن أن يكون فارغًا",
        "any.required": "الاسم (عربي)  مطلوب",
      }),
    }),
    image: Joi.array().items(Joi.string()).messages({
      "array.base": "Image must be an array",
      "array.includesRequiredUnknowns": "All Image URLs must be strings",
    }),
    description: Joi.object({
      en: Joi.string().required().messages({
        "string.base": "Description (English) must be a string",
        "string.empty": "Description (English) cannot be empty",
        "any.required": "Description (English) is a required field",
      }),
      ar: Joi.string().required().messages({
        "string.base": "الوصف (عربي) يجب أن يكون نصًا",
        "string.empty": "الوصف (عربي) لا يمكن أن يكون فارغًا",
        "any.required": "الوصف (عربي)  مطلوب",
      }),
    }),
  }),
};
