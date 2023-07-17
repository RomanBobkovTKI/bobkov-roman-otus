const {Router, request} = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async (_, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.getById(req.params.id)

    res.render('courseEdit', {
        title: `Курс ${course.title}`,
        course
    })
})

router.get('/:id', async(req, res) => {
    const course = await Course.getById(req.params.id)

    res.render('course', {
        layout: 'empty', 
        title: `Курс ${course.title}`,
        course
    })
})

router.post('/edit', async(req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})

module.exports = router