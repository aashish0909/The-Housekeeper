const mongoose = require("mongoose")
const Schema = mongoose.Schema

const suggestionSchema = new Schema({
	suggestionID: {
		type: Number,
		required: true,
	},
	feedbackID: {
		type: Number,
		required: true,
	},
	rollNo: {
		type: Number,
		required: true,
	},
	suggestion: {
		type: String,
		required: true,
	},
})

module.exports = Suggestion = mongoose.model("suggestion", suggestionSchema)
