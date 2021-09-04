const mongoose = require("mongoose")
const Schema = mongoose.Schema

const housekeeperSchema = new Schema({
	workerID: {
		type: Number,
		unique:true,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	hostel: {
		type: Number,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	roomsCleaned: {
		type: Number,
		default: 0
	},
	complaints: {
		type: Number,
		default: 0	},
})

module.exports = Housekeeper = mongoose.model("housekeeper", housekeeperSchema)
