const { StatusCodes } = require("http-status-codes");
const CustomAPIErrors = require("./custom-api");

class NotFound extends CustomAPIErrors {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

module.exports = NotFound;
