require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const workoutRouter = require('./routes/workout')

// express app
const app = express()
app.use(cors());

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRouter)

// connect DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("DB connected successfully & listening on port ", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })




