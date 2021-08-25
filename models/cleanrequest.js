const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cleanrequestSchema = new Schema({
	requestID: {
		type: Number,
		required: true,
	},
	rollNo: {
		type: Number,
		required: true,
	},
	workerID: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	req_status: {
		type: Boolean,
		default: false,
	},
})

module.exports = cleanrequest = mongoose.model(
	"cleanrequest",
	cleanrequestSchema
)
