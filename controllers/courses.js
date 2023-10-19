const courses = require('../models/course')
const lessons = require('../models/lesson')
const errorHeandler = require('../utils/errorHeandler')

class Courses {

    static async getAll(req, res) {
        const allCourses = await courses.find({}).lean()

        res.render('protectedMain', {
            isProtected: true,
            allCourses
        })
    }

    static async getAddCourse(_, res) {
        res.render('addCourse', {
            isProtected: true
        })
    }

    static async getEditCourse(req, res) {
        const course = await courses.findById(req.params.id)
    
        res.render('courseEdit', {
            isProtected: true,
            title: `${course.title}`,
            desc: `${course.desc}`,
            id: `${course._id}`,
        })
    }

    static async getById(req, res) {
        
        const course = await courses.findById(req.params.id)
        const allLessons = await lessons.find({course_id : req.params.id}).lean()

        res.render('course', {
            isProtected: true,
            title: `${course.title}`,
            desc: `${course.desc}`,
            id: `${course._id}`,
            allLessons
        })
    }

    static async addCourse(req, res) {
        const course = await courses.findOne({
            title: req.body.title
        })
    
        if (course) {
            res.render('addCourse', {
                message: 'Курс с таким названием уже существует.',
                messageClass: 'alert-danger'
            })
        } else {
            const newCourse = new courses ({
                title: req.body.title,
                desc: req.body.desc
            })
        
            try {
                await newCourse.save()
                const allCourses = await courses.find({}).lean()

                res.render('protectedMain', {
                    message: 'Курс успешно создан.',
                    messageClass: 'alert-success',
                    isProtected: true,
                    allCourses
                });
            } catch (error) {
                errorHeandler(res, error, 'protectedMain', true )
            }
        }
    }

    static async deleteCourse(req, res) {
        try {
            await courses.deleteMany({_id: req.params.id})

            const allCourses = await courses.find({}).lean()

            res.render('protectedMain', {
                isProtected: true,
                allCourses
            })
        } catch (err) {
            errorHeandler(res, error, 'protectedMain', true )
        }
    }

    static async updateCourse(req, res) {

        const updated = {
            title: req.body.title,
            desc: req.body.desc
        }
    
        try {
            const course = await courses.findByIdAndUpdate(
                {_id: req.body.id},
                {$set: updated},
                {new: true}
            )
    
            const allCourses = await courses.find({}).lean()

            res.render('protectedMain', {
                isProtected: true,
                allCourses
            })
        } catch (err) {
            errorHeandler(res, error, 'protectedMain', true )
        }
    }

}

module.exports = Courses