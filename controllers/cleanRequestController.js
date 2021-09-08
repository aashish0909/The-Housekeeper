const Cleanrequest = require("../models/cleanrequest")
const validateCreateRequest = require("../validation/cleanrequest")

module.exports.create = async (req, res) => {
	const { errors, isValid } = await validateCreateRequest(req.body)

	if (!isValid) return res.status(400).json(errors)

	await Cleanrequest.findOne({ student: req.user.id, date: req.body.date }).then(
		async (request) => {
			if (request) {
				return res
					.status(400)
					.json({ error: "A clean request on this day and at the given time already exists!" })
			}
			let newRequest = await new Cleanrequest({
				student: req.user.id,
				date: req.body.date,
			})
			const savedRequest = await newRequest.save()
			res.json(savedRequest)
		}
	)
}

module.exports.get = async (req, res) => {
	const request = await Cleanrequest.find({ student: req.user.id })
	res.json(request)
}
