require('dotenv').config()
const jwt = require('jsonwebtoken')

function authStudentMiddleware(req, res, next) {
	const token = req.headers["x-access-token"]

	if (!token) return res.status(401).json({ msg: "Authorization denied" })

	try {
		const decoded = jwt.verify(token, config.get("process.env.JWT_SECRET"))
		req.user = decoded
		if(req.user.role==="STUDENT")
			next()
		else return res.status(401).json({msg:"Authorization denied"})
	} catch (err) {
		res.status(400).json({ msg: "Token is not valid" })
	}
}

module.exports = authStudentMiddleware
