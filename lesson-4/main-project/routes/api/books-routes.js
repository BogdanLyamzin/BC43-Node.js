const express = require("express");
const Joi = require("joi");

const booksService = require("../../models/books");

const { HttpError } = require("../../helpers");

const router = express.Router();

const bookAddSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required().messages({
        "any.required": `"author" must be exist`
    }),
})

router.get("/", async (req, res, next) => {
    try {
        const result = await booksService.getAllBooks();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await booksService.getBookById(id);
        if (!result) {
            throw HttpError(404, `Book with ${id} not found`);
            // const error = new Error(`Book with ${id} not found`);
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: "Not Found"
            // })
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { error } = bookAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await booksService.addBook(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const { error } = bookAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params;
        const result = await booksService.updateBookById(id, req.body);
        if (!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await booksService.deleteBookById(id);
        if (!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        // res.json(result);
        // res.status(204).send();
        res.json({
            message: "Delete success"
        })
    }
    catch (error) {
        next(error);
    }
})

module.exports = router;