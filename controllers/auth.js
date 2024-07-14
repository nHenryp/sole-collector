const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')


//route/controllers
router.get('/sign-up', (req, res) => {
    return res.render('auth/sign-up')
})

router.post('/sign-up', async (req, res) => {
    const userInDataBase = await User.findOne({ username: req.body.username })
    if (userInDataBase) {
        return res.send('Username taken')
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('password do not match')
    }

    req.body.password = bcrypt.hashSync(req.body.password, 11)

    const user = await User.create(req.body)
    return res.send(`Welcome to the site, ${user.username}`)

})



router.get('/sign-in', (req, res) => {
    return res.render('auth/sign-in')
})
router.post('/sign-in', async (req, res) => {
    const userInDataBase = await User.findOne({ username: req.body.username })
    if (!userInDataBase) {
        console.log('user does not exist in database')
        return res.send('login failed')
    }

    const validPassword = bcrypt.compareSync(req.body.password, userInDataBase.password)
    if (!validPassword) {
        console.log('user exist, password incorrect')
     return res.send('user signed in failed.')   
    }
    
    req.session.user = {
        username: userInDataBase.username
    }
    res.redirect('/')
    
})

module.exports = router
