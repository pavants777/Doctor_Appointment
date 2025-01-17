const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectCloudinary = require('./config/cloudinary.js')
const adminRouter = require('./routes/adminRoute.js');
const doctorRouter = require('./routes/doctorRoute.js');
const userRouter = require('./routes/userRoute.js');
const connectDB = require('./config/mongodb.js');


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api end point
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res) => {
  res.send('Api working...')
})

app.listen(port, () => console.log('Server started', port)) 