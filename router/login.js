const {Router} = require('express')
const router = Router()

const controller = require('../controllers/auth')

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Вход в систему',
        isLogin: true,
    })
})

router.post('/', controller.login)

module.exports = router