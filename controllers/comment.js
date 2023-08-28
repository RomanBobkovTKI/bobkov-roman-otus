const lessons = require('../models/lesson')
const courses = require('../models/course')
const comment = require('../models/comment')

class Comment {

    static getAddCommentPage(req, res) {
        res.render('addCommentPage', {
            isProtected: true,
            lesson_id: req.params.id
        })
    }

    static async addComment(req, res) {

        const newComment = new comment({
            text: req.body.text,
            author: req.body.author,
            lesson_id: req.body.lesson_id
        })
        
        try {
            await newComment.save()
            const allCourses = await courses.find({}).lean()

            res.render(`protectedMain`, {
                isProtected: true,
                allCourses,
                message: 'Комментарий успешно добавлен.',
                messageClass: 'alert-danger'
            })
        } catch (error) {
            const allCourses = await courses.find({}).lean()
            res.render('protectedMain', {
                allCourses,
                isProtected: true,
                message: `${error}`,
                messageClass: 'alert-success'
            });
        }

    }

    static async deleteComment(req, res) {
        try {
            await comment.deleteMany({_id: req.params.id})

            const allCourses = await courses.find({}).lean()

            res.render('protectedMain', {
                isProtected: true,
                allCourses,
                message: `Комеентарий успешно удален`
            })
        } catch (error) {
            res.render('protectedMain', {
                isProtected: true,
                message: `${error}`,
                messageClass: 'alert-success'
            });
        }
    }

}

module.exports = Comment