const { Router } = require('express')
const controller = require('../controllers/auth')

const route = Router()

route.post('/login', controller.login)
route.post('/register', controller.register)

module.exports = route