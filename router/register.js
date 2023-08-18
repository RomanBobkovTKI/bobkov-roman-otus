const {Router} = require('express')
const router = Router()

const controller = require('../controllers/auth')

router.get('/', (req, res) => {
    res.render('register', {
        title: 'Регистрация',
        isRegister: true
    })
})

router.post('/', controller.register)

module.exports = router