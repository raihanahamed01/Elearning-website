import { instance } from "../index.js";
import TryCatch from "../middlewares/trycatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/lecture.js";
import { Payment } from "../models/payment.js";
import { User } from "../models/usermodel.js";
import crypto from 'crypto'

export const getallcourses=TryCatch(async(req,res)=>{
    const courses=await Courses.find()
    res.json({
        courses
    })

})

export const getsinglecourse=TryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)
    res.json({
        course
    })

})
export const fetchlectures=TryCatch(async(req,res)=>{
    const lectures=await Lecture.find({course:req.params.id})

    const user=await User.findById(req.user._id)

    if(user.role==="admin"){
        return res.json({lectures})
    }
    if(!user.subscription.includes(req.params.id)) return res.status(400).json({
        message:"you have not subscribed to this course"
    })
    res.json({
        lectures
    })
})
export const fetchlecture=TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
      return res.json({ lecture });
    }
    if (!user.subscription.includes(lecture.course))
      return res.status(400).json({
        message: "you have not subscribed to this course",
      });
    res.json({
      lecture,
    });

})
export const getmycourses=TryCatch(async(req,res)=>{
    const courses=await Courses.find({_id:req.user.subscription})

    res.json({
        courses
    })
})

export const checkout=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)
    const course=await Courses.findById(req.params.id)

    if(user.subscription.includes(course._id)){
        return res.status(400).json({
            message:"you already have this course"
        })
    }
    const options={
        amount:Number(course.price *100),
        currency:"INR"
    }
    const order=await instance.orders.create(options)

    res.status(201).json({
        order,
        course
    })
})
export const paymentverification=TryCatch(async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body

    const body=razorpay_order_id + "|" + razorpay_payment_id

    const expectedsignature=crypto.createHmac(
        "sha256",process.env.Razorpay_Secret).update(body).digest("hex")


     const isauthentic=expectedsignature===razorpay_signature

     if(isauthentic){
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })
        const user=await User.findById(req.user._id)
        const course=await Courses.findById(req.params.id)

        user.subscription.push(course._id)
        await user.save()
        res.status(200).json({
            message:"course purchased successfully"
        })


     }else{
        return res.status(400).json({
            message:"payment failed"
        })
     }

})