const lessons = require('../models/lesson')
const courses = require('../models/course')
const comment = require('../models/comment')
const errorHeandler = require('../utils/errorHeandler')
const { all } = require('../router/protected')

class Lesson {

    static async getAddPage(req, res) {
        res.render('addLessonPage', {
            isProtected: true,
            id: req.params.id,
        })
    }

    static async addPage(req, res) {

        const newLesson = new lessons({
            title: req.body.title,
            desc: req.body.desc,
            course_id: req.body.course_id,
            videoSrc: req.body.videoSrc
        })

        try {
            await newLesson.save()
            const allCourses = await courses.find({}).lean()

            res.render(`protectedMain`, {
                isProtected: true,
                allCourses,
                message: 'Урок успешно добавлен.',
                messageClass: 'alert-danger'
            })
        } catch (error) {
            const allCourses = await courses.find({}).lean()
            errorHeandler(res, error, `protectedMain`, true, allCourses)
        }
    }

    static async getLessonPage(req, res) {

        const currentLesson = await lessons.findById(req.params.id)
        const comments = await comment.find({lesson_id: req.params.id}).lean()

        res.render('lessonPage', {
            isProtected: true,
            title: `${currentLesson.title}`,
            desc: `${currentLesson.desc}`,
            videoSrc: `${currentLesson.videoSrc}`,
            currentLesson,
            lesson_id: `${currentLesson.id}`,
            comments
        })
    }

    static async getEditPage(req, res) {

        const currentLesson = await lessons.findById(req.params.id)
    
        res.render('lessonEditPage', {
            isProtected: true,
            title: `${currentLesson.title}`,
            desc: `${currentLesson.desc}`,
            videoSrc: `${currentLesson.videoSrc}`,
            id: `${currentLesson._id}`,
            currentLesson
        })
    }

    static async editLesson(req, res) {

        const updated = {
            title: req.body.title,
            desc: req.body.desc,
            videoSrc: req.body.videoSrc
        }

        try {
            await lessons.findByIdAndUpdate(
                {_id: req.body.id},
                {$set: updated},
                {new: true}
            )

            const allCourses = await courses.find({}).lean()

            res.render('protectedMain', {
                isProtected: true,
                allCourses
            })
        } catch (error) {
            errorHeandler(res, error, `protectedMain`, true)
        }

    }

    static async deleteLesson(req, res) {
        try {
            await lessons.deleteMany({_id: req.params.id})

            const allCourses = await courses.find({}).lean()

            res.render('protectedMain', {
                isProtected: true,
                allCourses,
                message: `Курс успешно удален`
            })
        } catch (error) {
            errorHeandler(res, error, `protectedMain`, true)
        }
    }

}

module.exports = Lesson