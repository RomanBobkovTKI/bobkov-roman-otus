const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token: {
        type: String
    },
    user: {
        type: String
    }
})

module.exports = mongoose.model('token', tokenSchema)