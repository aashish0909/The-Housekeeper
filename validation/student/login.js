const Validator = require("validator")
const isEmpty = require("is-empty")

function validateLoginInput(data) {
	let errors = {}

	data.rollNo = !isEmpty(data.rollNo) ? data.rollNo : ""
	data.password = !isEmpty(data.password) ? data.password : ""

	if (Validator.isEmpty(data.rollNo)) {
		errors.rollNo = "Roll no. field is required"
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
