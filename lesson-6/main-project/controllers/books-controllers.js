const {Book} = require("../models/book");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const getAllBooks = async (req, res) => {
    const result = await Book.find({}, "-createdAt -updatedAt");
    res.json(result);
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    // const result = await Book.findOne({_id: id});
    const result = await Book.findById(id);
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
}

const addBook = async (req, res) => {
    const result = await Book.create(req.body);
    res.status(201).json(result);
}

const updateBookById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
}

const deleteBookById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

module.exports = {
    getAllBooks: ctrlWrapper(getAllBooks),
    getBookById: ctrlWrapper(getBookById),
    addBook: ctrlWrapper(addBook),
    updateBookById: ctrlWrapper(updateBookById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteBookById: ctrlWrapper(deleteBookById),
}