const mongoose = require("mongoose")
const Schema = mongoose.Schema

const complaintSchema = new Schema({
	complaintID: {
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
	complaint: {
		type: String,
		required: true,
	},
})

module.exports = complaint = mongoose.model("complaint", complaintSchema)
