const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "This field is required"],
			minlength: 3,
			maxlength: 50,
			unique: true,
		},
		author: {
			type: String,
			default: "Anonymous",
		},

		price: {
			type: Number,
			required: [true, "This field is required"],
		},
		ratings: {
			type: Number,
			required: [true, "This field is required"],
		},
		availability: {
			type: Boolean,
			default: true,
		},
		class: {
			type: Number,
			required: [true, "This field is required"],
			enum: {
				values: [1, 2, 3, 4],
				message: "{VALUE} is not supported",
			},
		},
		createdBy: {
			// to make it associated with the user
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "This field is required"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
