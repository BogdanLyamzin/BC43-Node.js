const express = require("express");

const booksController = require("../../controllers/books-controllers");

const {isValidId, authenticate, upload} = require("../../middlewares");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/book");

const router = express.Router();

router.use(authenticate);

router.get("/", booksController.getAllBooks);

router.get("/:id", isValidId, booksController.getBookById);

// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}])
// upload.array("cover", 8);
router.post("/", upload.single("cover"), validateBody(schemas.bookAddSchema), booksController.addBook);

router.put("/:id", isValidId, validateBody(schemas.bookAddSchema), booksController.updateBookById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.bookUpdateFavoriteSchema), booksController.updateFavorite);

router.delete("/:id", isValidId, booksController.deleteBookById);

module.exports = router;