const Validator = require("validator")
const isEmpty = require("is-empty")

function validateCreateRequest(data) {
    let errors = {}
    
	if (Validator.isEmpty(data.date)) {
		errors.password = "Date and Time are required"
    }

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

module.exports = validateCreateRequest
