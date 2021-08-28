const Student = require("..//models/student")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const validateRegisterInput = require("../validation/student/register")
const validateLoginInput = require("../validation/student/login")

module.exports.signup = (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body)

	if (!isValid) {
		return res.status(400).json(errors)
	}

	Student.findOne({ rollNo: req.body.rollNo }).then((student) => {
		if (student) {
			return res
				.status(400)
				.json({ rollNo: "Roll No. already exists in the database" })
		}

		const newStudent = new Student({
			rollNo: req.body.rollNo,
			password: req.body.password,
			room: req.body.room,
			floor: req.body.floor,
			hostel: req.body.hostel,
		})

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) throw err
				newStudent.password = hash
				newStudent
					.save()
					.then((student) => {
						jwt.sign(
							{ id: student._id },
							config.get("jwtsecret"),
							{ expiresIn: 2592000 },
							(err, token) => {
								if (err) throw err
								res.json({
									token,
									user: {
										id: student._id,
									},
								})
							}
						)
					})
					.catch((err) => console.log(err))
			})
		})
	})
}

module.exports.login = (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body)

	if (!isValid) return res.status(400).json(errors)

	const rollNo = req.body.rollNo
	const password = req.body.password

	Student.findOne({ rollNo }).then((student) => {
		if (!student) return res.status(404).json("User does not exist")

		bcrypt.compare(password, student.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

			jwt.sign(
				{ id: student._id },
				config.get("jwtsecret"),
				{ expiresIn: 2592000 },
				(err, token) => {
					if (err) throw err
					res.json({
						token,
						user: { id: student._id },
					})
				}
			)
		})
	})
}

module.exports.get_user = (req, res) => {
	Student.findById(req.body.id)
		.select("-password")
		.then((student) => res.json(student))
}
