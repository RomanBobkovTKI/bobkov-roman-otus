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

lessonSchema.methods.joiValidate = function(obj) {
	var Joi = require('joi');
	var schema = {
		title: Joi.types.String().required(),
        desc: Joi.types.String().required(),
        course_id: Joi.types.String().required(),
        videoSrc: Joi.types.String().required(),
	}
	return Joi.validate(obj, schema);
}

module.exports = mongoose.model('lessons', lessonSchema)