const express = require('express')
const hbs = require('hbs')
const expressHbs = require("express-handlebars");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 3000
const URL_DB = 'mongodb://127.0.0.1:27017'

const app = express()

const homeRoutes = require('./router/home')
const loginRoutes = require('./router/login')
const registerRoutes = require('./router/register')
const protectedRoutes = require('./router/protected')
const tokenMiddleware = require('./middleware/token')

mongoose.connect(URL_DB)
    .then(() => console.log('Подключение к БД успешно.'))
    .catch(err => console.log(err))

app.engine('hbs', expressHbs.engine({
    layoutsDir: 'views/layouts',
    defaultlayout: 'layout',
    extname: 'hbs'
}))

app.use(passport.initialize())
require('./middleware/passport')(passport)

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "views"));



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(morgan('dev'));
app.use(cors())


app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/protected', protectedRoutes)



app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту.`)
})