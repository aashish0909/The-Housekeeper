const { Router } = require('express')
const authStudentController = require('../controllers/authStudentController')
const router = Router()
const authStudentMiddleware = require('../middlewares/authStudentMiddleware')

router.post('/signup', authStudentController.signup)
router.post('/login', authStudentController.login)
router.get('/user', authStudentMiddleware, authStudentController.get_user)

module.exports = router