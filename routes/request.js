const { Router } = require('express')
const cleanRequestController = require("../controllers/cleanRequestController")
const router = Router()
const authStudentMiddleware = require('../middlewares/authStudentMiddleware')

router.post('/cleanrequest',authStudentMiddleware,cleanRequestController.create)