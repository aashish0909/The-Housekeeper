const Validator = require("validator")
const isEmpty = require("is-empty")

function validateRegisterInput(data) {
	let errors = {}

	//rollNo check
	if (Validator.isEmpty(data.rollNo)) {
		errors.rollNo = "Roll no. field is required"
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required"
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required"
	}
	if (Validator.isEmpty(data.room)) {
		errors.room = "Room field is required"
	}
	if (Validator.isEmpty(data.floor)) {
		errors.floor = "Floor field is required"
	}
	if (Validator.isEmpty(data.hostel)) {
		errors.hostel = "Hostel field is required"
	}

	if (!Validator.isAlphanumeric(data.rollNo))
		errors.rollNo = "Roll No. can consist only alphabets and numbers"
	if (!Validator.isStrongPassword(data.password)) {
		errors.password =
			"Password must be atleast of 8 characters and contain atleast one lowercase character,one uppercase character, one digit and one symbol"
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match"
	}
	return {
		errors,
		isValid: isEmpty(errors),
	}
}

module.exports = validateRegisterInput
