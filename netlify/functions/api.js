require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const isSignedIn = require('../../middleware/is-signed-in.js')
const passUserToView = require('../../middleware/pass-user-to-view.js')

const serverless = require('serverless-http')



const app = express()


const authController = require('../../controllers/auth.js')
const trainerscontroller = require('../../controllers/trainers.js')
const usersController = require('../../controllers/users.js')

mongoose.connect(process.env.MONGODB_URI)

//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.static('public'));
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
   res.render('index', {
    user: req.session.user
    
   })

})



app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users', isSignedIn, usersController);

app.use('/users/:userId/trainers', trainerscontroller)

app.get('*', (req, res) => {
    return res.render('404')
})



module.exports.handler = serverless(app)
