require('dotenv').config()
const jwt = require('jsonwebtoken')

function authAdminMiddleware(req, res, next) {
	const token = req.headers["x-access-token"]

	if (!token) return res.status(401).json({ msg: "Authorization denied" })

	try {
		const decoded = jwt.verify(token, config.get("process.env.JWT_SECRET"))
		req.user = decoded
		// console.log(req.user.role)
		if(req.user.role==="ADMIN")
			next()
		else return res.status(401).json({msg:"Authorization denied"})
	} catch (err) {
		res.status(400).json({ msg: "Token is not valid" })
	}
}

module.exports = authAdminMiddleware
