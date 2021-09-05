const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cleanrequestSchema = new Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "student"
	},
	rollNo: {
		type: Number,
		required: true,
	},
	workerID: {
		type: Number,
	},
	date: {
		type: Date,
		required : true
	},
	room: {
		type: Number,
		required : true,
	},
	floor: {
		type: Number,
		required : true,
	},
	hostel: {
		type: Number,
		required : true,
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
