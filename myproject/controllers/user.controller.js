const User = require('../models/user.model')

async function getAllUsers(request, reply) {
    try {
        const users = await User.find({})
        reply.send(users)
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function getUserById(request, reply) {
    try {
        const user = await User.findById(request.params.id)
        if (user) {
            reply.send(user)
        } else {
            reply.status(404).send({message: 'Not found'})
        }
        
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function createUser(request, reply) {
    try {
        const user = new User(request.body)
        const result = await user.save()
        reply.send(result)
    } catch (error) {
        reply.status(500).send({error: error.message})
    }
}

async function updateUser(request, reply) {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, {new: true})
        if (user) {
            reply.send(user)
        } else {
            reply.status(404).send({message: 'Not found'})
        }
        
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

async function deleteUser(request, reply) {
    try {
       const result = await User.findByIdAndDelete(request.params.id)
       if (result) {
            reply.status(204).send({message: 'User is deleted'})  
       } else {
            reply.status(404).send({message: 'Not found'})
       }
    } catch (error) {
        reply.status(500).send({error: error})
    }
}

module.exports = {
    getAllUsers, getUserById, createUser, updateUser, deleteUser
}