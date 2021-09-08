const Feedback = require("../models/feedback")
const Cleanrequest = require("../models/cleanrequest")
const validateFeedback = require("../validation/feedback")

module.exports.submitFeedback = async (req, res) => {
	const { errors, isValid } = await validateFeedback(req.body)

	if (!isValid) return res.status(400).json(errors)

	const findone = await Feedback.findOne({ student: req.user.id, requestID: req.body.requestID })
	if (findone) {
		return res
			.status(400)
			.json({ success: false, error: "Feedback for the given request has already been submitted" })
	}
	let newFeedback = await new Feedback({
		student: req.user.id,
		requestID: req.body.requestID,
		feedbackType: req.body.feedbackType,
		feedback: req.body.feedback,
		rating: req.body.rating,
		timeIn: req.body.timeIn,
		timeOut: req.body.timeOut,
	})
	await Cleanrequest.findByIdAndUpdate(req.body.requestID,{reqStatus:"Request Completed"})
	const savedRequest = await newFeedback.save()
	res.json({ success: true, savedRequest })
}

module.exports.getFeedback = async (req, res) => {
	const request = await Feedback.find({ student: req.user.id, requestID: req.body.requestID })
	res.json(request)
}
