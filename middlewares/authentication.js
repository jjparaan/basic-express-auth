const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const auth = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new Unauthenticated("Authentication invalid");
	}
	const token = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// attach the user to the Book routes
		req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (error) {
		throw new Unauthenticated("Authentication invalid");
	}
};

module.exports = auth;
