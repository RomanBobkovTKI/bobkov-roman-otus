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

commentSchema.methods.joiValidate = function(obj) {
	var Joi = require('joi');
	var schema = {
		text: Joi.types.String().required(),
        author: Joi.types.String().required(),
        lesson_id: Joi.types.String().required(),
	}
	return Joi.validate(obj, schema);
}

module.exports = mongoose.model('comment', commentSchema)
 
    