require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')



const app = express()
const port = process.env.PORT || 3000

const authController = require('./controllers/auth.js')
const trainerscontroller = require('./controllers/trainers.js')



//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))


app.use(passUserToView)



app.get('/', async (req, res) => {
    if (req.session.user._id) {
       return res.redirect(`/users/${req.session.user._id}/trainers`)
    } else {
        res.render('index')
    }

})



app.use('/auth', authController)
app.use(isSignedIn)

app.use('/users/:userId/trainers', trainerscontroller)

app.get('*', (req, res) => {
    return res.render('404')
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connection establishe')
        app.listen(port, () => {
            console.log(`the express app is ready on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
connect()