const mongoose = require("mongoose")
const cleanrequest = require("./cleanrequest")
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
	requestID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cleanrequest",
	},
	feedbackType: {
		type: String,
		required:true
	},
	feedback: {
		type: String,
		required:true
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

module.exports = Feedback = mongoose.model("feedback", feedbackSchema)
