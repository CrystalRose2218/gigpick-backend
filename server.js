// dependencies------------------------------
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const fileUpload = require('express-fileupload')


// database connection ----------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("db connected!"))
  .catch(err => console.error("db connection failed ", err))


// express app setup -----------------------
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('*', cors())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))

// routes ---------------------------------

// home 
app.get('/', (req, res) => {
  res.send("Homepage")
})

// auth
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

// user
const userRouter = require('./routes/user')
app.use('/user', userRouter)

// gig
const gigRouter = require('./routes/gig')
app.use('/gigs', gigRouter)


// run app listen on port --------------------
app.listen(port, () => {
  console.log("App running on port ", port)
})