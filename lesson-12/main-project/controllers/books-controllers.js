// const fs = require("fs/promises");
const path = require("path");

const {Book} = require("../models/book");

const { ctrlWrapper } = require("../utils");

const { HttpError, renameUploadFile } = require("../helpers");

const booksDir = path.resolve("public", "books");

const getAllBooks = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Book.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
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
    const {file} = req;
    await renameUploadFile(file, booksDir);
    // const {path: tempUpload, filename} = req.file;
    // const resultUpload = path.join(booksDir, filename);
    // await fs.rename(tempUpload, resultUpload);
    const {_id: owner} = req.user;
    const cover = path.join("books", file.filename);
    const result = await Book.create({...req.body, cover, owner});
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