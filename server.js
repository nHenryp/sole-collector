require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')


const authController = require('./controllers/auth.js')

const app = express()
const port = process.env.PORT || 3000



//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))






app.get('/', (req, res) => {
    res.render('index')
})


app.use('/auth', authController)


app.get('*', (req, res) => {
    
   return res.render('auth/404')
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