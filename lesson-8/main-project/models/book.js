const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const genreList = ["fantastic", "love"];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: genreList,
        required: true,
    },
    // 10-10-2012
    date: {
        type: String,
        match: dateRegexp,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true});

bookSchema.post("save", handleMongooseError);

const bookAddSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required().messages({
        "any.required": `"author" must be exist`
    }),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    date: Joi.string().pattern(dateRegexp).required(),
});

const bookUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    bookAddSchema,
    bookUpdateFavoriteSchema,
}



const Book = model("book", bookSchema);

module.exports = {
    Book,
    schemas,
}