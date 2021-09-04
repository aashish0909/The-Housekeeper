const config = require("config")
const jwt = require("jsonwebtoken")

function authAdminMiddleware(req, res, next) {
	const token = req.headers["x-access-token"]

	if (!token) return res.status(401).json({ msg: "Authorization denied" })

	try {
		const decoded = jwt.verify(token, config.get("jwtsecret"))
		req.user = decoded
		next()
	} catch (err) {
		res.status(400).json({ msg: "Token is not valid" })
	}
}

module.exports = authAdminMiddleware
