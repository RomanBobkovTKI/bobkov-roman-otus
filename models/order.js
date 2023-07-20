const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
    },
    order: {
        type: String,
        required: true,
    },
    list: [{
        name: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        coast: {
            type: Number
        }
    }],
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('orders', orderSchema)