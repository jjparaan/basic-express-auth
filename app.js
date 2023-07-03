require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connectDB");
const authenticateUser = require("./middlewares/authentication");
// routers
const userRouter = require("./routes/UserRouter");
const bookRouter = require("./routes/BookRouter");

// error handlers
const pageNotFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// middleware
app.use(express.json());

// routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/books", authenticateUser, bookRouter);

app.use(pageNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`Server running on port: ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
