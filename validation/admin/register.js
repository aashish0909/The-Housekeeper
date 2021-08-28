const Validator = require("validator")
const isEmpty = require("is-empty")

function validateRegisterInput(data) {
	let errors = {}

	data.adminID = !isEmpty(data.adminID) ? data.adminID : ""
	data.password = !isEmpty(data.password) ? data.password : ""
	data.password2 = !isEmpty(data.password2) ? data.password2 : ""
	data.hostel = !isEmpty(data.hostel) ? data.hostel : ""

	if (Validator.isEmpty(data.adminID)) {
		errors.adminID = "Admin ID field is required"
	}

	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required"
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required"
	}

	if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
		errors.password = "Password must be at least 8 characters"
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
