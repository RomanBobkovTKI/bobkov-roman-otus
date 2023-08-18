const {Router} = require('express')
const router = Router()

const authToken = require('../middleware/token')

router.get('/', authToken.requireAuth)

module.exports = router