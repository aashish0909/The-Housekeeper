var validator = require("validator")
const isEmpty = require("is-empty")

function validateRegisterInput(data) {
	let errors = {}

	if (validator.isEmpty(data.adminID)) {
		errors.adminID = "Admin ID field is required"
	}
	if (validator.isEmpty(data.password)) {
		errors.password = "Password field is required"
	}
	if (validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required"
	}
	if (validator.isEmpty(data.hostel)) {
		errors.hostel = "Hostel field is required"
	}

	if (!validator.isNumeric(data.adminID))
		errors.adminID = "Admin ID can consist only numeric characters"
	if (!validator.isStrongPassword(data.password)) {
		errors.password =
			"Password must be atleast of 8 characters and contain atleast one lowercase character,one uppercase character, one digit and one symbol"
	}
	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match"
	}
	return {
		errors,
		isValid: isEmpty(errors),
	}
}

module.exports = validateRegisterInput
