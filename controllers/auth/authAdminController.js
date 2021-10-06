const Admin = require("../../models/admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const validateRegisterInput = require("../../validation/admin/register")
const validateLoginInput = require("../../validation/admin/login")

module.exports.signup = async (req, res) => {
	const { errors, isValid } = await validateRegisterInput(req.body)

	if (!isValid) {
		return res.status(400).json(errors)
	}

	await Admin.findOne({ adminID: req.body.adminID }).then((admin) => {
		if (admin) {
			return res.status(400).json({ rollNo: "Admin ID already exists in the database" })
		}

		const newAdmin = new Admin({
			adminID: req.body.adminID,
			password: req.body.password,
			hostel: req.body.hostel,
		})

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err
				newAdmin.password = hash
				newAdmin
					.save()
					.then((admin) => {
						jwt.sign(
							{
								id: admin._id,
								role: "ADMIN",
							},
							process.env.JWT_SECRET,
							{ expiresIn: "1d" },
							(err, token) => {
								if (err) throw err
								res.json({
									token,
								})
							}
						)
					})
					.catch((err) => console.log(err))
			})
		})
	})
}

module.exports.login = async (req, res) => {
	const { errors, isValid } = await validateLoginInput(req.body)

	if (!isValid) return res.status(400).json(errors)

	const adminID = req.body.adminID
	const password = req.body.password

	await Admin.findOne({ adminID }).then((admin) => {
		if (!admin) return res.status(404).json("Admin does not exist")

		bcrypt.compare(password, admin.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

			jwt.sign(
				{
					id: admin._id,
					role: "ADMIN",
				},
				process.env.JWT_SECRET,
				{ expiresIn: "1d" },
				(err, token) => {
					if (err) throw err
					res.json({
						token,
					})
				}
			)
		})
	})
}

module.exports.get_user = (req, res) => {
	Admin.findById(req.user.id)
		.select("-password")
		.then((admin) => res.json(admin))
}
