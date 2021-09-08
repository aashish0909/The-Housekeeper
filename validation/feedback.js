const Validator = require("validator")
const isEmpty = require("is-empty")

function validateFeedback(data) {
    let errors = {}
    
	if (Validator.isEmpty(data.feedbackType)) {
		errors.feedbackType = "Feedback Type field is required"
    }
	if (Validator.isEmpty(data.feedback)) {
		errors.feedback = "Feedback field is required"
    }
	if (Validator.isEmpty(data.rating)) {
		errors.rating = "Rating field is required"
    }
	if (Validator.isEmpty(data.timeIn)) {
		errors.timeIn = "In time is required"
    }
	if (Validator.isEmpty(data.timeOut)) {
		errors.timeOut = "Out time is required"
    }

    

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

module.exports = validateFeedback
