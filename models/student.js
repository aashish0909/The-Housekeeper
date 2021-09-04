const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
	rollNo: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	room: {
		type: Number,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	hostel: {
		type: Number,
		required: true,
	},
})

module.exports = Student = mongoose.model("student", studentSchema)
