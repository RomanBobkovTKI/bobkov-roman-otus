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

router.post('/logout', controller.login)
router.get('/courses', authToken.requireAuth, Courses.getAll)

router.get('/addCourse', authToken.requireAuth, Courses.getAddCourse)
router.post('/addCourse', authToken.requireAuth, Courses.addCourse)

router.get('/courses/:id', authToken.requireAuth, Courses.getById)
router.get('/courses/:id/edit', authToken.requireAuth, Courses.getEditCourse)
router.post('/courses/edit', authToken.requireAuth, Courses.updateCourse)
router.get('/courses/:id/delete', authToken.requireAuth, Courses.deleteCourse)

router.get('/courses/:id/addLesson', authToken.requireAuth, Lesson.getAddPage)
router.post('/addLesson', authToken.requireAuth, Lesson.addPage)
router.get('/lesson/:id', authToken.requireAuth, Lesson.getLessonPage)
router.get('/lesson/:id/edit', authToken.requireAuth, Lesson.getEditPage)
router.post('/lesson/edit', authToken.requireAuth, Lesson.editLesson)
router.get('/lesson/:id/delete', authToken.requireAuth, Lesson.deleteLesson)

router.get('/lesson/:id/addComment', authToken.requireAuth, Comment.getAddCommentPage)
router.post('/addComment', authToken.requireAuth, Comment.addComment)
router.get('/lesson/:id/deleteComment', authToken.requireAuth, Comment.deleteComment)

module.exports = router

//изменить перед мерджем тип методов для ревью