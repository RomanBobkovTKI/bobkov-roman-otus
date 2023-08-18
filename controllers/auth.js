const User = require('../models/user')
const errorHeandler = require('../utils/errorHeandler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const cookieParser = require('cookie-parser');

const authTokens = {};

module.exports.login = async(req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

      if (passwordResult) {
         const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
         }, keys.jwt, {expiresIn: 60 * 60})

         authTokens[token] = candidate

         res.cookie('AuthToken', token)
         res.redirect('/protected')
      } else {
         res.status(401)
            .json({
               Error: 'Некорректный пароль, попробуйте снова.'
            })
      }

    } else {
        res.render('login', {
            message: 'Неверный email или пароль. Попробуйте еще раз.',
            messageClass: 'alert-danger'
        })
    }
}

module.exports.register = async(req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
     })

    if (candidate) {
        res.render('register', {
            message: 'Пользователь с таким email уже зарегистрирован.',
            messageClass: 'alert-danger'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const user = new User ({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password
        })
    
        try {
            await user.save()
            res.render('login', {
                message: 'Регистрация успешна завершена. Войдите в систему для продолжения.',
                messageClass: 'alert-success'
            });
        } catch (error) {
            errorHeandler(res, error)
        }
    }
}