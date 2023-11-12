'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const mongoose = require('mongoose')
const auth = require('./middlewares/auth')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to db')
  } catch (error) {
    console.log(error)
  }

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.addHook('preHandler', auth)
}

module.exports.options = options
