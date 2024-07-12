
const express = require('express')

const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app= express()

app.use('/admin',adminRouter)
app.use('/user',userRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });