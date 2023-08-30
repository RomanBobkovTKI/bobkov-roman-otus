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

userSchema.methods.joiValidate = function(obj) {
	var Joi = require('joi');
	var schema = {
		first_name: Joi.types.String().min(6).max(30).required(),
        last_name: Joi.types.String().min(6).max(30).required(),
		password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
		email: Joi.types.String().email().required(),
	}
	return Joi.validate(obj, schema);
}

module.exports = mongoose.model('users', userSchema)