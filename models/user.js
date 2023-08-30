const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: ['Email является обязательным полем.'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Пожалуйста введите корректный email.']
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Минимальная длина пароля 6 символов.']
    }
})

module.exports = mongoose.model('users', userSchema)