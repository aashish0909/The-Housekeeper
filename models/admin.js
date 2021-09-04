const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
	adminID: {
		type: Number,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	hostel: {
		type: Number,
		required: true,
	},
})

module.exports = Admin = mongoose.model("admin", adminSchema)
