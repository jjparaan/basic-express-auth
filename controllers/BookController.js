const Book = require("../models/BookModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFound } = require("../errors");

const getAllBooks = async (req, res) => {
	const books = await Book.find({});
	res.status(StatusCodes.OK).json({ books });
};

const addBook = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const book = await Book.create(req.body);
	res.status(StatusCodes.CREATED).json({ book });
};

const searchBook = async (req, res) => {
	const { title, author, numericFilters, availability, sort, fields } =
		req.query;
	const queryObject = {};

	if (title) {
		queryObject.title = { $regex: title, $options: "i" };
	}

	if (author) {
		queryObject.author = { $regex: author, $options: "i" };
	}

	if (numericFilters) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<": "$lt",
			"<=": "$lte",
		};
		const regEx = /\b(>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);

		const options = ["price", "ratings", "class"];
		filters = filters.split(",").forEach((item) => {
			const [field, operator, value] = item.split("-");
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}

	if (availability) {
		queryObject.availability = availability === "true" ? true : false;
	}

	let result = Book.find(queryObject);

	if (sort) {
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	}

	if (fields) {
		const fieldsList = fields.split(",").join(" ");
		result = result.select(fieldsList);
	}

	const books = await result;
	res.status(StatusCodes.OK).json({ count: books.length, books });
};

const getBook = async (req, res) => {
	const { id: bookId } = req.params;
	const book = await Book.findOne({ _id: bookId });
	if (!book) {
		throw new NotFound("The book that you're looking for don't exist");
	}
	res.status(StatusCodes.OK).json({ book });
};

const updateBook = async (req, res) => {
	const { id: bookId } = req.params;
	const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!book) {
		throw new NotFound("Can't edit a book that don't exist");
	}
	res.status(StatusCodes.OK).json({ book });
};

const removeBook = async (req, res) => {
	const { id: bookId } = req.params;
	const book = await Book.findOneAndDelete({ _id: bookId });
	if (!book) {
		throw new NotFound("Can't delete a book that don't exist");
	}
	res.status(StatusCodes.OK).json({ msg: `Book #${bookId} have been deleted` });
};

module.exports = {
	getAllBooks,
	addBook,
	searchBook,
	getBook,
	updateBook,
	removeBook,
};
