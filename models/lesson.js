const {mongoose, Schema} = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false,
        default: 'Описание урока:'
    },
    course_id: {
        type: Schema?.Types.ObjectId,
        ref: 'Course'
    },
    videoSrc: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('lessons', lessonSchema)