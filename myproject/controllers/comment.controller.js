const User = require('../models/user.model')
const Task = require('../models/task.model')
const Comment = require('../models/comment.model')

async function createComment(request, reply) {
    try {
        const authorId = await User.findById(request.body.authorId)
        const taskId = await Task.findById(request.body.taskId)

        if (!authorId) {
            return reply.status(404).send({message: 'User not found'})
        }

        if (!taskId) {
            return reply.status(404).send({message: 'Task not found'})
        }

        const comment = new Comment(request.body)
        const result = await comment.save()
        reply.send(result)
    } catch (error) {
        reply.status(400).send({error: error})
    }
}

async function getAllComments(request, reply) {
    try {
        const comments = await Comment.find()
        .populate('taskId', 'title description')
        .populate('authorId', 'firstName lastName email')

        if (comments.length === 0) {
            reply.status(404).send({message: 'Not found'})
        }

        reply.send(comments)
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function getCommentById(request, reply) {
    try {
        const comment = await Comment.findById(request.params.id)
        .populate('taskId', 'title description')
        .populate('authorId', 'firstName lastName email')

        if (comment) {
            reply.send(comment)
        } else {
            reply.status(404).send({message: 'Not found'})
        }
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function updateComment(request, reply) {
    try {
        const commentId = request.params.id
        const updates = request.body

        if (updates.taskId) {
            const taskId = await Task.findById(taskId)
            if (!taskId) {
                return reply.status(400).send({message: 'Task not found'})
            }
        }

        if (updates.authorId) {
            const authorId = await User.findById(authorId)
            if (!authorId) {
                return reply.status(400).send({message: 'Author not found'})
            }
        }

        const updateComment = await Comment.findByIdAndUpdate(commentId, updates, {new: true})

        if (!updateComment) {
            reply.status(404).send({message: 'No comment with that id found'})
        }

        reply.send(updateComment)

    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function deleteComment(request, reply) {
    try {
        const deleteComment = await Comment.findByIdAndDelete(request.params.id)
        if (!deleteComment) {
            reply.status(404).send({message: 'Not found'})
        }

        reply.status(204).send({message: 'Comment is deleted'})
    } catch (error) {
         reply.status(500).send({error: error})
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
}