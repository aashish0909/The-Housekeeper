const Admin = require("..//models/admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const validateRegisterInput = require("../validation/admin/register")
const validateLoginInput = require("../validation/admin/login")

module.exports.signup = (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body)

	if (!isValid) {
		return res.status(400).json(errors)
	}

	Admin.findOne({ adminID: req.body.adminID }).then((admin) => {
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
							config.get("jwtsecret"),
							{ expiresIn: 2592000 },
							(err, token) => {
								if (err) throw err
								res.json({
									token,
									user: {
										id: admin._id,
										role: "ADMIN",
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

	const adminID = req.body.adminID
	const password = req.body.password

	Admin.findOne({ adminID }).then((admin) => {
		if (!admin) return res.status(404).json("Admin does not exist")

		bcrypt.compare(password, admin.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

			jwt.sign(
				{
					id: admin._id,
					role: "ADMIN",
				},
				config.get("jwtsecret"),
				{ expiresIn: 2592000 },
				(err, token) => {
					if (err) throw err
					res.json({
						token,
						user: {
							id: admin._id,
							role: "ADMIN",
						},
					})
				}
			)
		})
	})
}

module.exports.get_user = (req, res) => {
	Admin.findById(req.body.id)
		.select("-password")
		.then((admin) => res.json(admin))
}
