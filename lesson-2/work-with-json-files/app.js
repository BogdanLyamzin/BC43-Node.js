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

// invokeAction({action: "list"})
// invokeAction({action: "getById", id: "u9kgwNWGi3uUUwh0b8V48"})
// invokeAction({action: "add", title: "Worm", author: "Джон Маккрей"})
// invokeAction({action: "update", id: "L3pxwG8bjmJ3FKMne3Xl8", title: "Ward", author: "Джон Маккрей"})
// invokeAction({action: "delete", id: "L3pxwG8bjmJ3FKMne3Xl8"})
