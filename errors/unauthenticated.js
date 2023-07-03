const { StatusCodes } = require("http-status-codes");
const CustomAPIErrors = require("./custom-api");

class Unauthenticated extends CustomAPIErrors {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

module.exports = Unauthenticated;
