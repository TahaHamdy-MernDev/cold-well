const Joi = require("joi");
module.exports = {
  propertyKeys: Joi.object({
    title: Joi.object({
      en: Joi.string().required().messages({
        "string.base": "Title (English) must be a string",
        "string.empty": "Title (English) cannot be empty",
        "any.required": "Title (English) is a required field",
      }),
      ar: Joi.string().required().messages({
        "string.base": "العنوان (عربي) يجب أن يكون نصًا",
        "string.empty": "العنوان (عربي) لا يمكن أن يكون فارغًا",
        "any.required": "العنوان (عربي) مطلوب",
      }),
    }),
    location: Joi.object({
      en: Joi.string().required().messages({
        "string.base": "Location (English) must be a string",
        "string.empty": "Location (English) cannot be empty",
        "any.required": "Location (English) is a required field",
      }),
      ar: Joi.string().required().messages({
        "string.base": "الموقع (عربي) يجب أن يكون نصًا",
        "string.empty": "الموقع (عربي) لا يمكن أن يكون فارغًا",
        "any.required": "الموقع (عربي) مطلوب",
      }),
    }),
    price: Joi.object({
        minPrice: Joi.string().pattern(/^[0-9]+$/).required().messages({
          "string.base": "Minimum price must be a string of digits",
          "string.pattern.base": "Minimum price must be numeric",
          "any.required": "Minimum price is a required field",
        }),
        maxPrice: Joi.string().pattern(/^[0-9]+$/).required().messages({
          "string.base": "Maximum price must be a string of digits",
          "string.pattern.base": "Maximum price must be numeric",
          "any.required": "Maximum price is a required field",
        }),
        currency: Joi.string().required().messages({
          "string.base": "Currency must be a string",
          "string.empty": "Currency cannot be empty",
          "any.required": "Currency is a required field",
        }),
      }),
      bedrooms: Joi.string().pattern(/^[0-9]+$/).required().messages({
        "string.base": "Bedrooms must be a string of digits",
        "string.pattern.base": "Bedrooms must be numeric",
        "any.required": "Bedrooms is a required field",
      }),
      bathrooms: Joi.string().pattern(/^[0-9]+$/).required().messages({
        "string.base": "Bathrooms must be a string of digits",
        "string.pattern.base": "Bathrooms must be numeric",
        "any.required": "Bathrooms is a required field",
      }),
      size: Joi.string().pattern(/^[0-9]+$/).required().messages({
        "string.base": "Size must be a string of digits",
        "string.pattern.base": "Size must be numeric",
        "any.required": "Size is a required field",
      }),
    compound: Joi.object({
      en: Joi.string().required().messages({
        "string.base": "Compound name (English) must be a string",
        "string.empty": "Compound name (English) cannot be empty",
        "any.required": "Compound name (English) is a required field",
      }),
      ar: Joi.string().required().messages({
        "string.base": "اسم المجمع (عربي) يجب أن يكون نصًا",
        "string.empty": "اسم المجمع (عربي) لا يمكن أن يكون فارغًا",
        "any.required": "اسم المجمع (عربي) مطلوب",
      }),
    }),
    deliveryDate: Joi.string().required().messages({
        "string.pattern.base": "Delivery date must be in YYYY-MM-DD format",
        "any.required": "Delivery date is a required field",
      }),
    uniqueSellingPoints: Joi.array()
      .items(
        Joi.object({
          title: Joi.object({
            en: Joi.string().required().messages({
              "string.base": "USP title (English) must be a string",
              "string.empty": "USP title (English) cannot be empty",
              "any.required": "USP title (English) is a required field",
            }),
            ar: Joi.string().required().messages({
              "string.base": "عنوان نقطة البيع الفريدة (عربي) يجب أن يكون نصًا",
              "string.empty":
                "عنوان نقطة البيع الفريدة (عربي) لا يمكن أن يكون فارغًا",
              "any.required": "عنوان نقطة البيع الفريدة (عربي) مطلوب",
            }),
          }),
          description: Joi.object({
            en: Joi.string().required().messages({
              "string.base": "USP description (English) must be a string",
              "string.empty": "USP description (English) cannot be empty",
              "any.required": "USP description (English) is a required field",
            }),
            ar: Joi.string().required().messages({
              "string.base": "وصف نقطة البيع الفريدة (عربي) يجب أن يكون نصًا",
              "string.empty":
                "وصف نقطة البيع الفريدة (عربي) لا يمكن أن يكون فارغًا",
              "any.required": "وصف نقطة البيع الفريدة (عربي) مطلوب",
            }),
          }),
        })
      )
      .messages({
        "array.base": "Unique Selling Points must be an array",
      }),
      description: Joi.object({
        en: Joi.string().required().messages({
          "string.base": "USP description (English) must be a string",
          "string.empty": "USP description (English) cannot be empty",
          "any.required": "USP description (English) is a required field",
        }),
        ar: Joi.string().required().messages({
          "string.base": " أن يكون نصًا",
          "string.empty":
            "الوصف (عربي) لا يمكن أن يكون فارغًا",
          "any.required": "الوصف (عربي) مطلوب",
        }),
      }),
    images: Joi.array().items(Joi.string().required()).messages({
      "array.base": "Images must be an array of strings",
      "string.base": "Each image must be a string",
    }),
    paymentPlans: Joi.array()
    .items(
      Joi.object({
        planName: Joi.string().required().messages({
          "string.base": "Plan name must be a string",
          "string.empty": "Plan name cannot be empty",
          "any.required": "Plan name is a required field",
        }),
        monthlyPayment: Joi.string().pattern(/^[0-9]+$/).required().messages({
          "string.base": "Monthly payment must be a string of digits",
          "string.pattern.base": "Monthly payment must be numeric",
          "any.required": "Monthly payment is a required field",
        }),
        downPayment: Joi.string().pattern(/^[0-9]+$/).required().messages({
          "string.base": "Down payment must be a string of digits",
          "string.pattern.base": "Down payment must be numeric",
          "any.required": "Down payment is a required field",
        }),
        durationYears: Joi.string().pattern(/^[0-9]+$/).required().messages({
          "string.base": "Duration (years) must be a string of digits",
          "string.pattern.base": "Duration (years) must be numeric",
          "any.required": "Duration (years) is a required field",
        }),
      })
    )
    .messages({
      "array.base": "Payment plans must be an array",
    }),
    contact: Joi.object({
      number: Joi.string().required().messages({
        "string.base": "Contact number must be a string",
        "string.empty": "Contact number cannot be empty",
        "any.required": "Contact number is a required field",
      }),
      whatsappLink: Joi.string().uri().required().messages({
        "string.uri": "WhatsApp link must be a valid URL",
        "any.required": "WhatsApp link is a required field",
      }),
    }),
    type: Joi.string().required().messages({
      "string.base": "Type must be a string",
      "any.required": "Type is a required field",
    }),
    developer: Joi.string().required().messages({
      "string.base": "Developer must be a string",
      "any.required": "Developer is a required field",
    }),
    sale: Joi.string(),
    for: Joi.string(),
  }),
};
