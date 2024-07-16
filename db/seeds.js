const mongoose = require('mongoose')
require('dotenv').config()

const User = require('../models/user.js')
const Trainer = require('../models/trainer.js')
//data
const userData = require('./data/users.js')



const seedDatabase = async () => {
    try {
//connecting to the database
await mongoose.connect(process.env.MONGODB_URI)


//remove all data from database
const deletedUsers = await User.deleteMany()
console.log(`${deletedUsers.deletedCount}`)


const deletedTrainers = await Trainer.deleteMany()
console.log(`${deletedTrainers.deletedCount}`)

//create new users in the database
const users = await User.create(userData)
console.log(users)

const trainersWithOwners = trainerData.map(trainer => {
    trainers.owner = users[Math.floor(Math.random() * users.length)]._id
    return trainer
})

//create new trainers to the database
const trainers = await Trainer.create(trainersWithOwners)
//closing out connection
await mongoose.connection.close()
    }catch (error) {
        console.log(error)
    }

}