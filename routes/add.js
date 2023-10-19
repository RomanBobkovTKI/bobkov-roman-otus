const {Router} = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', (_, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    })
})

router.post('/', async (req, res) => {
    const course = new Course(req.body.title, req.body.price, req.body.url)

    await course.save()

    res.redirect('/courses')
})

module.exports = router