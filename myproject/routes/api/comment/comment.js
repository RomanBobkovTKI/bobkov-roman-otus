'use strict'

const commentController = require('../../../controllers/comment.controller')

module.exports = async function (fastify, opts) {
  fastify.get('/all', commentController.getAllComments)
  fastify.get('/:id', commentController.getCommentById)
  fastify.post('/', commentController.createComment)
  fastify.put('/:id', commentController.updateComment)
  fastify.delete('/:id', commentController.deleteComment)
}