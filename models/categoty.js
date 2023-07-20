const mongoose = require('mongoose')

const catrgotySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: true,
    },
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('categories', catrgotySchema)