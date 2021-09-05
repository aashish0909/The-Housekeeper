const { Router } = require('express')
const authStudentController = require('../../controllers/auth/authStudentController')
const router = Router()
const authStudentMiddleware = require('../../middlewares/authStudentMiddleware')

router.post('/signup', authStudentController.signup)
router.post('/login', authStudentController.login)
router.get('/get_user', authStudentMiddleware, authStudentController.get_user)

module.exports = router