const {Router} = require('express')

const authToken = require('../middleware/token')
const controller = require('../controllers/auth')
const Courses = require('../controllers/courses')
const Lesson = require('../controllers/lesson')
const Comment = require('../controllers/comment')

const router = Router()

router.get('/', authToken.requireAuth, (_, res) => {
    res.render('protectedMain', {
        isProtected: true
    })
})
router.use(authToken.requireAuth)
router.post('/logout', controller.login)
router.get('/courses', Courses.getAll)

router.get('/addCourse', Courses.getAddCourse)
router.post('/addCourse', Courses.addCourse)

router.get('/courses/:id', Courses.getById)
router.get('/courses/:id/edit', Courses.getEditCourse)
router.post('/courses/edit', Courses.updateCourse)
router.get('/courses/:id/delete', Courses.deleteCourse)

router.get('/courses/:id/addLesson', Lesson.getAddPage)
router.post('/addLesson', Lesson.addPage)
router.get('/lesson/:id', Lesson.getLessonPage)
router.get('/lesson/:id/edit', Lesson.getEditPage)
router.post('/lesson/edit', Lesson.editLesson)
router.get('/lesson/:id/delete', Lesson.deleteLesson)

router.get('/lesson/:id/addComment', Comment.getAddCommentPage)
router.post('/addComment', Comment.addComment)
router.get('/lesson/:id/deleteComment', Comment.deleteComment)

module.exports = router