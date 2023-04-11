const Book = require("../models/book");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const getAllBooks = async (req, res) => {
    const result = await Book.find();
    res.json(result);
};

// const getBookById = async (req, res) => {
//     const { id } = req.params;
//     const result = await booksService.getBookById(id);
//     if (!result) {
//         throw HttpError(404, `Book with ${id} not found`);
//     }
//     res.json(result);
// }

// const addBook = async (req, res) => {
//     const result = await booksService.addBook(req.body);
//     res.status(201).json(result);
// }

// const updateBookById = async (req, res) => {
//     const { id } = req.params;
//     const result = await booksService.updateBookById(id, req.body);
//     if (!result) {
//         throw HttpError(404, `Book with ${id} not found`);
//     }
//     res.json(result);
// }

// const deleteBookById = async (req, res) => {
//     const { id } = req.params;
//     const result = await booksService.deleteBookById(id);
//     if (!result) {
//         throw HttpError(404, `Book with ${id} not found`);
//     }

//     res.json({
//         message: "Delete success"
//     })
// }

module.exports = {
    getAllBooks: ctrlWrapper(getAllBooks),
    // getBookById: ctrlWrapper(getBookById),
    // addBook: ctrlWrapper(addBook),
    // updateBookById: ctrlWrapper(updateBookById),
    // deleteBookById: ctrlWrapper(deleteBookById),
}