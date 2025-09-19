const express = require('express')
const dotenv = require('dotenv').config() //Used for loading || configure the env variables
const connectDB = require('./db/index')
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const studentRoute = require('./routes/studentRoutes')
const hostelRoute = require('./routes/hostelRoutes')
const feeRoute = require('./routes/feeRoutes')
const attendanceRoute = require('./routes/attendanceRoute')
const studentFeeRoute = require('./routes/studentFeeRoute')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(errorHandler)

// app.use(cors());


const PORT = process.env.PORT || 5000

try {
    connectDB();
    app.listen(PORT, (req, res) => {
        console.log(`server is running on port ${PORT}`);
    })

} catch (error) {
    console.log("Something went wrong ");
}

// Simple route
app.get('/', (req, res) => {
    res.status(200).json({ message: `Welcome to server That is running on ${PORT} port` })
})

// route for user
app.use('/api/v1/users/staff', userRoute)
app.use('/api/v1/users/student', studentRoute)
app.use('/api/v1/attendance', attendanceRoute)
app.use('/api/v1/hostel', hostelRoute)
app.use('/api/v1/fee', feeRoute)
app.use('/api/v1/studentfee',studentFeeRoute )