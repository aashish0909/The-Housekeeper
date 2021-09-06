const Validator = require("validator")
const isEmpty = require("is-empty")

function validateLoginInput(data) {
	let errors = {}

	if (Validator.isEmpty(data.adminID)) {
		errors.adminID = "Admin ID field is required"
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required"
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

module.exports = validateLoginInput
