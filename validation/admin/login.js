const Validator = require("validator")
const isEmpty = require("is-empty")

function validateLoginInput(data) {
	let errors = {}

	data.adminID = !isEmpty(data.adminID) ? data.adminID : ""
	data.password = !isEmpty(data.password) ? data.password : ""

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
