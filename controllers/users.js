const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.js')
const Trainer = require('../models/trainer.js')

router.get('/profile', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.user._id)
    console.log('User id:', userId)

    const user = await User.findById(userId).exec()
    if (!user) {
      return res.status(404).send('user not found')
    }
    const trainersOwned = user.trainers
    res.render('users/show.ejs', { trainers:
      trainersOwned
    })
  } catch (error) {
    console.log(error);
  }
});


module.exports = router