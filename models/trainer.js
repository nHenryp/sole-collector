const mongoose = require('mongoose')


const trainerSchema = new mongoose.Schema({
    name: String,
    size: String,
    color: String,
    material: String,
    year: Number,
    type: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})


const Trainer = mongoose.model('Trainer', trainerSchema)

module.exports = Trainer;