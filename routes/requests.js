const { Router } = require("express")
const cleanRequestController = require("../controllers/cleanRequestController")
const feedbackController = require("../controllers/feedbackController")
const router = Router()
const authStudentMiddleware = require("../middlewares/authStudentMiddleware")

router.post("/cleanrequest", authStudentMiddleware, cleanRequestController.create)

router.get("/get_cleanrequests", authStudentMiddleware, cleanRequestController.get)

router.post("/submitFeedback", authStudentMiddleware, feedbackController.submitFeedback)

router.get("/get_feedback",authStudentMiddleware,feedbackController.getFeedback)

module.exports = router
