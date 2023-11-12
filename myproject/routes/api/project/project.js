'use strict'

const projectController = require('../../../controllers/project.controller')

module.exports = async function (fastify, opts) {
    fastify.post('/', projectController.createProject)
    fastify.get('/all', projectController.getAllProject)
    fastify.get('/:id', projectController.getProjectById)
    fastify.put('/:id', projectController.updateProject)
    fastify.delete('/:id', projectController.deleteProject)
  }