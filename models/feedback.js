const mongoose = require("mongoose")
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
	feedbackID: {
		type: Number,
		required: true,
	},
	rollNo: {
		type: Number,
		required: true,
	},
	requestID: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
	},
	timeIn: {
		type: Date,
		default: Date,
	},
	timeOut: {
		type: Date,
		default: Date,
	},
})

module.exports = feedback = mongoose.model("feedback", feedbackSchema)
