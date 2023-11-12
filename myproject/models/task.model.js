const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Assigned', 'Canceled', 'Closed', 'Declined', 'Draft',],
        default: 'Draft',
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;