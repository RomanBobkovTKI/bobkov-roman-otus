const {mongoose, Schema} = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: false,
        default: 'Not Description'
    },
})

module.exports = mongoose.model('courses', courseSchema)