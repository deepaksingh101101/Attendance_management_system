const express=require('express')
const dotenv=require('dotenv').config()
// const cors=require('cors')
const {mongoose} =require('mongoose')



const cookieParser = require('cookie-parser')


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Data Base Connected")})
.catch((err)=>{console.log("Database not connected",err)})

const app=express();


// Middle ware
app.use(express.json())//json data passed from frontend will be avaliavle in req.body
app.use(cookieParser())//When a request is made to your Express application, the cookieParser middleware will automatically parse any cookies included in the request's headers and make them available as an object (req.cookies) that you can access in your route handlers.
app.use('/',require('./routes/authRoutes'))//all request comeing to / url will use the routes defined in authRouts.js
app.use(express.urlencoded({extended:false})) //for jwt token

const port=8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

