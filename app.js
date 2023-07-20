const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

const URL_DB = 'mongodb://127.0.0.1:27017/'

const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/categoty')
const positionRoutes = require('./routes/position')
const analyticsRouter = require('./routes/analytics')

const app = express()

mongoose.connect(URL_DB)
        .then(() => console.log('Подключиние к БД успешно'))
        .catch(err => console.log(err))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position/', positionRoutes)
app.use('/api/analytics', analyticsRouter)

module.exports = app