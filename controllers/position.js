const Position = require('../models/position')
const errorHeandler = require('../utils/errorHeandlers')

module.exports.getByCategoryId = async(req, res) => {
    try {
        const position = await Position.find({
            categoty: req.params.categoryId,
            user: req.user.id
        })

        res.status(200)
            .json(position)
    } catch (err ) {
        errorHeandler(res, err)
    }
}

module.exports.create = async(req, res) => {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            catrgory: req.body.categoty,
            user: req.user.id
        }).save()

        res.status(201)
            .json(position)
    } catch (err ) {
        errorHeandler(res, err)
    }
}

module.exports.update = async(req, res) => {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: id.params.id},
            {$set: req.body},
            {new: true}
        )

        res.status(200)
            .json(position)

    } catch (err ) {
        errorHeandler(res, err)
    }
}

module.exports.remove = async(req, res) => {
    try {
        await Position.remove({_id: req.params.id})
        res.status(200)
            .json({
                succsess: true,
                message: `Позиция удалена.`
            })
    } catch (err ) {
        errorHeandler(res, err)
    }
}