const User = require('../models/user.model')
const Project = require('../models/project.model')

async function createProject(request, reply) {
    try {
        const projectManager = await User.findById(request.body.projectManager)
        if (!projectManager || !['Admin', 'Project Manager'].includes(projectManager.role)) {
            return reply.status(400).send({message: 'Invalid project manager'})
        }

        for (let memberId of request.body.teamMembers) {
            const teamMember = await User.findById(memberId)
            if (!teamMember) {
                return reply.status(400).send({message: `Invalid member: ${memberId}`})
            }
        }

        const project = new Project(request.body)
        const result = await project.save()
        reply.send(result)
    } catch (error) {
        reply.status(400).send({error: error})
    }
}

async function getAllProject(request, reply) {
    try {
        const projects = await Project.find()
        .populate('projectManager', 'firstName lastName email')
        .populate('teamMembers', 'fisrtName lastName email')
        if (projects.length === 0) {
            reply.status(404).send({message: 'Not found'})
        } else {
            reply.send(projects)
        }
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function getProjectById(request, reply) {
    try {
        const project = await Project.findById(request.params.id)
        .populate('projectManager', 'firstName lastName email')
        .populate('teamMembers', 'fisrtName lastName email')
        if (project) {
            reply.send(project)
        } else {
            reply.status(404).send({message: 'Not found'})
        }
        
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function updateProject(request, reply) {
    try {
        const projectId = request.params.id
        const updates = request.body

        if (updates.projectManager) {
            const projectManager = await User.findById(updates.projectManager)
            if (!projectManager || !['Admin', 'Project Manager'].includes(projectManager.role)) {
                return reply.status(400).send({message: 'Invalid project manager'})
            }
        }

        if (updates.teamMembers) {
            for (let memberId of updates.teamMembers) {
                const teamMember = await User.findById(memberId)
                if (!teamMember) {
                    return reply.status(400).send({message: `Invalid member: ${memberId}`})
                }
            }
        }

        const updateProject = await Project.findByIdAndUpdate(projectId, updates, {new: true})

        if (!updateProject) {
            reply.status(404).send({message: 'No project with that id found'})
        }

        reply.send(updateProject)
        
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function deleteProject(request, reply) {
    try {
        const deleteProject = await Project.findByIdAndDelete(request.params.id)
        if (!deleteProject) {
            reply.status(404).send({message: 'Not found'})
        }
        reply.status(204).send({message: 'User is deleted'})
        
    } catch (error) {
         reply.status(500).send({error: error})
    }
}

module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
}