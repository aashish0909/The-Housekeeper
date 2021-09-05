const { Router } = require('express')
const authAdminController = require('../../controllers/auth/authAdminController')
const router = Router()
const authAdminMiddleware = require('../../middlewares/authAdminMiddleware')

router.post('/register_admin', authAdminController.signup)
router.post('/login', authAdminController.login)
router.get('/get_user', authAdminMiddleware, authAdminController.get_user)

module.exports = router