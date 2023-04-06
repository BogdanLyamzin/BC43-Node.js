const fs = require("fs/promises");
// const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const booksPath = path.join(__dirname, "books.json");
// const booksPath = path.resolve("books", "books.json");

const updateBooks = async (books) => await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

const getAllBooks = async () => {
    const data = await fs.readFile(booksPath);
    return JSON.parse(data);
}

const getBookById = async (id) => {
    const books = await getAllBooks();
    const result = books.find(item => item.id === id);
    return result || null;
}

const addBook = async ({ title, author }) => {
    const books = await getAllBooks();
    const newBook = {
        id: nanoid(),
        title,
        author,
    };
    books.push(newBook);
    await updateBooks(books);
    return newBook;
}

const updateBookById = async (id, { title, author }) => {
    const books = await getAllBooks();
    const index = books.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    books[index] = { id, title, author };
    await updateBooks(books);
    return books[index];
}

const deleteBookById = async (id) => {
    const books = await getAllBooks();
    const index = books.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = books.splice(index, 1);
    await updateBooks(books);
    return result;
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById,
}