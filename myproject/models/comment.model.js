const mongoose = require('mongoose')
const User = require('./user.model')
const Task = require('./task.model')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: 'Content is required',
        trim: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;