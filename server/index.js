
const express = require('express')
const app= express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mloyycz.mongodb.net/course_app_database?retryWrites=true&w=majority&appName=Cluster0`)
app.use(cors())
app.use(express.json())
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')



app.use('/admin',adminRouter)
app.use('/users',userRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });