const mongoose = require('mongoose')
const {trainerSchema} = require('./trainer')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    trainers: [trainerSchema],
        
    
})

const User = mongoose.model('User', userSchema)

module.exports = User