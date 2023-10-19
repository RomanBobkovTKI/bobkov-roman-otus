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

courseSchema.methods.joiValidate = function(obj) {
	var Joi = require('joi');
	var schema = {
		title: Joi.types.String().required(),
        desc: Joi.types.String().required(),
	}
	return Joi.validate(obj, schema);
}

module.exports = mongoose.model('courses', courseSchema)