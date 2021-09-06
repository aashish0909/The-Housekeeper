const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cleanrequestSchema = new Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "student"
	},
	workerID: {
		type: Number,
	},
	date: {
		type: Date,
		required : true
	},
	reqStatus: {
		type: String,
		default: "Worker not assigned",
	},
})

module.exports = Cleanrequest = mongoose.model(
	"cleanrequest",
	cleanrequestSchema
)
