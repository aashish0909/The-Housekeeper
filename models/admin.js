const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
	adminID: {
		type: Number,
		required: [true, "Please enter your ID"],
	},
	password: {
		type: String,
		required: [true, "Please enter a valid password"],
		minlength: [8, "Minimum password length must be 8 characters"],
	},
	hostel: {
		type: Number,
		required: true,
	},
})

module.exports = Admin = mongoose.model("admin", adminSchema)
