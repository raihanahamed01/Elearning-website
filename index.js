import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import Razorpay from 'razorpay'
import cors from 'cors'


dotenv.config()

export const instance=new Razorpay({
    key_id:process.env.Razorpay_key,
    key_secret:process.env.Razorpay_Secret

})

const app=express()

app.use(express.json())
app.use(cors())

const port =process.env.PORT || 5000

app.use("/uploads",express.static("uploads"))

import userRoutes from "./routes/user.js"
import courseRoutes from "./routes/Courses.js"
import adminRoutes from "./routes/admin.js"
app.use("/api",userRoutes)
app.use("/api",courseRoutes)
app.use("/api",adminRoutes)



app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
    connectDb()
})