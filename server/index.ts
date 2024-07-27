
import express from 'express'
const app= express()
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mloyycz.mongodb.net/course_app_database?retryWrites=true&w=majority&appName=Cluster0`)
app.use(cors())
app.use(express.json())
import adminRouter from './routes/admin'
import userRouter from './routes/user'



app.use('/admin',adminRouter)
app.use('/users',userRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });