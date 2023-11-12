'use strict'

const userController = require('../../../controllers/user.controller')

module.exports = async function (fastify, opts) {
  fastify.get('/all', userController.getAllUsers)
  fastify.get('/:id', userController.getUserById)
  fastify.post('/', userController.createUser)
  fastify.put('/:id', userController.updateUser)
  fastify.delete('/:id', userController.deleteUser)
}