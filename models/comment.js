const {mongoose, Schema} = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
        default: 'No Name'
    },
    lesson_id: {
        type: Schema?.Types.ObjectId,
        ref: 'Lesson'
    }
})

module.exports = mongoose.model('comment', commentSchema)
 
    