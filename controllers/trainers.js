const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('trainers/index.ejs', {
            trainers: currentUser.trainers
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
router.get('/new', async (req, res) => {
    res.render('trainers/new')
})

router.post('/', async (req, res) => {
    try {
        console.log(req.session.user._id)
        const currentUser = await User.findById(req.session.user._id)
        if (!currentUser) throw new Error('no user')

        currentUser.trainers.push(req.body)
        await currentUser.save()
        console.log(currentUser)
        res.redirect(`/users/${currentUser._id}/trainers`)
    } catch (error) {
        console.log(error.message)
        res.render('trainers/new', { errorMessage: 'failed to add' })
    }
})

router.get('/:trainerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const trainer = currentUser.trainers.id(req.params.trainerId)
        if (!trainer) throw new Error('trainer not found')
        res.render('trainers/show', {
            trainer
        })
    } catch (error) {
        console.log(error)
        res.render('404')
    }
})

router.delete('/:trainerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.trainers.id(req.params.trainerId).deleteOne()

        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/trainers`)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:trainerId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        if (!currentUser) throw new Error('User not found')
        const trainer = currentUser.trainers.id(req.params.trainerId)
        if (!trainer) throw new Error('trainer not found')

        res.render('trainers/edit', {
            trainer
        })
    } catch (error) {
        console.log(error)
        res.render('404')


    }
})
router.put('/:trainerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        if (!currentUser) throw new Error('user not found')

        const trainer = currentUser.trainers.id(req.params.trainerId)
        if (!trainer) throw new Error('trainer not found')
        trainer.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/trainers/${trainer._id}`)


    } catch (error) {
        console.log(error)
        res.render('404')
    }
})



module.exports = router