const yargs = require("yargs");

const booksService = require("./books");

const invokeAction = async({action, id, title, author}) => {
    switch(action) {
        case "list":
            const allBooks = await booksService.getAllBooks();
            return console.log(allBooks);
        case "getById":
            const oneBook = await booksService.getBookById(id);
            return console.log(oneBook);
        case "add":
            const newBook = await booksService.addBook({title, author});
            return console.log(newBook);
        case "update":
            const updateBook = await booksService.updateBookById(id, {title, author});
            return console.log(updateBook);
        case "delete":
            const deleteBook = await booksService.deleteBookById(id);
            return console.log(deleteBook);
    }
}

const {argv} = yargs(process.argv.slice(2));
invokeAction(argv)
