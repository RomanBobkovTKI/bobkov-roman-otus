'use strict'

const taskController = require('../../../controllers/task.controller')

module.exports = async function (fastify, opts) {
  fastify.get('/all', taskController.getAllTasks)
  fastify.get('/:id', taskController.getTaskById)
  fastify.post('/', taskController.createTask)
  fastify.put('/:id', taskController.updateTask)
  fastify.delete('/:id', taskController.deleteTask)
}