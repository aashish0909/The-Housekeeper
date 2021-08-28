const mongoose = require("mongoose")
const Schema = mongoose.Schema

const housekeeperSchema = new Schema({
	workerID: {
		type: Number,
		required: [true, "Please enter your Housekeeper ID"],
	},
	name: {
		type: String,
		required: [true, "Please enter your name"],
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
