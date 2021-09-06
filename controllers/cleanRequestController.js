const Cleanrequest = require("../models/cleanrequest")
const student = require("../models/student")
const validateCreateRequest = require("../validation/cleanrequest")
const mongoose = require("mongoose")

module.exports.create = async (req, res) => {
	const { errors, isValid } = await validateCreateRequest(req.body)

    if (!isValid) return res.status(400).json(errors)
    
    const currStudent = mongoose.Types.ObjectId(req.user.id)

	await Cleanrequest.findOne({ student: currStudent , date: req.body.date }).then(async (request) => {
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
	})
}
