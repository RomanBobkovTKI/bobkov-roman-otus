const mongoose = require('mongoose')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name is required',
        trim: true,
    },
    lastName: {
        type: String,
        required: 'Last name is required',
        trim: true,
    },
    email: {
        type: String,
        required: 'Email is required',
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: 'Password is required',
        minLength: [6, 'Minimum password length 6 characters']
    },
    role: {
        type: String,
        enum: ['Admin', 'Project manager', 'Team member'],
        default: 'Team member',
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;