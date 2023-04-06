const express = require("express");

const booksController = require("../../controllers/books-controllers");

const {validateBody} = require("../../utils");

const schemas = require("../../schemas/books");

const router = express.Router();

router.get("/", booksController.getAllBooks);

router.get("/:id", booksController.getBookById);

router.post("/", validateBody(schemas.bookAddSchema), booksController.addBook);

router.put("/:id", validateBody(schemas.bookAddSchema), booksController.updateBookById);

router.delete("/:id", booksController.deleteBookById);

module.exports = router;