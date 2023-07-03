const express = require("express");
const router = express.Router();
const {
	getAllBooks,
	addBook,
	searchBook,
	getBook,
	updateBook,
	removeBook,
} = require("../controllers/BookController");

router.route("/").get(getAllBooks).post(addBook);
router.route("/search").get(searchBook);
router.route("/:id").get(getBook).patch(updateBook).delete(removeBook);

module.exports = router;
