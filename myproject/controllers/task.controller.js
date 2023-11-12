const User = require('../models/user.model')
const Task = require('../models/task.model')
const Project = require('../models/project.model')

async function getAllTasks(request, reply) {
    try {
        const tasks = await Task.find()
        .populate('projectId', 'title description')

        if (tasks.length === 0) {
            reply.status(404).send({message: 'Not found'})
        }

        reply.send(tasks)
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function getTaskById(request, reply) {
    try {
        const task = await Task.findById(request.params.id)
        if (task) {
            reply.send(task)
        } else {
            reply.status(404).send({message: 'Not found'})
        }
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function createTask(request, reply) {
    try {
        const projectId = await Project.findById(request.body.projectId)
        if (!projectId) {
            return reply.status(400).send({message: 'Project not found'})
        }

        const task = new Task(request.body)
        const result = await task.save()
        reply.send(result)
    } catch (error) {
        reply.status(500).send({error: error.message})
    }
}

async function updateTask(request, reply) {
    try {
        const taskId = request.params.id
        const updates = request.body

        if (updates.projectId) {
            const projectId = await Project.findById(updates.projectId)
            if (!projectId) {
                return reply.status(400).send({message: 'Project not found'})
            }
        }

        const updateTask = await Task.findByIdAndUpdate(taskId, updates, {new: true})

        if (!updateTask) {
            reply.status(404).send({message: 'No task with that id found'})
        }

        reply.send(updateTask)

    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function deleteTask(request, reply) {
    try {
       const deleteTask = await Task.findByIdAndDelete(request.params.id)
       if (!deleteTask) {
        reply.status(404).send({message: 'Not found'})
       }
       reply.status(204).send({message: 'User is deleted'})
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

module.exports = {
    getAllTasks, getTaskById, createTask, updateTask, deleteTask
}