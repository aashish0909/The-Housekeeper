const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
	rollNo: {
		type: String,
		required: [true, "Please enter your roll no."]
	},
	password: {
		type: String,
		required: [true, "Please enter a valid password"],
		minlength: [8, "Minimum password length must be 8 characters"],
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
