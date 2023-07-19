const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const kyes = require('../config/keys')
const errorHeandlers = require('../utils/errorHeandlers')

module.exports.login = async(req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

      if (passwordResult) {
         const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
         }, kyes.jwt, {expiresIn: 60 * 60})

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
            error: 'Пользователь с таким email уже существует.'
         })
   } else {
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      const user = new User({
         email: req.body.email,
         password: bcrypt.hashSync(password, salt)
      })

      try {
         await user.save()
         res.status(201)
            .json(user)
      } catch(err) {
         errorHeandlers(res, err)
      }
   }
}