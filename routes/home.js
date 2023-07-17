const {Router} = require('express')
const router = Router()

router.get('/', (_, res) => {
    res.render('index', {
        title: 'Главная странциа',
        isMain: true,
    })
})

module.exports = router