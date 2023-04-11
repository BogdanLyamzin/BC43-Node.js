const Joi = require("joi");

const bookAddSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required().messages({
        "any.required": `"author" must be exist`
    }),
})

module.exports = {
    bookAddSchema,
}