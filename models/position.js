const mongoose = require('mongoose')

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    cost: {
        type: Number,
        required: true
    }, 
    catrgory: {
        ref: 'categories',
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('positions', positionSchema)