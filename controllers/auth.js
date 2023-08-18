const User = require('../models/user')
const errorHeandler = require('../utils/errorHeandler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports.login = async(req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

      if (passwordResult) {
         const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
         }, keys.jwt, {expiresIn: 60 * 60})

         res.status(200)
            .json({
               token: `Bearer ${token}`
            })
      } else {
         res.status(401)
            .json({
               Error: 'Некорректный пароль, попробуйте снова.'
            })
      }

    } else {
      res.status(404)
         .json({
            Error: 'Пользователь с таким email не найден.'
         })
    }
}

module.exports.register = async(req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
     })

    if (candidate) {
        res.status(409)
            .json({
                error: 'Пользователь с таким email уже сущестсует.'
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

            res.status(201)
            res.redirect('/login')
        } catch (error) {
            errorHeandler(res, error)
        }
    } 


}