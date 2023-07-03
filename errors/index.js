const CustomAPIErrors = require("./custom-api");
const BadRequestError = require("./bad-request");
const NotFound = require("./not-found");
const Unauthenticated = require("./unauthenticated");

module.exports = {
	CustomAPIErrors,
	BadRequestError,
	NotFound,
	Unauthenticated,
};
