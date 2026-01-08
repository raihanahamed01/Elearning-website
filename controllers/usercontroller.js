import { User } from "../models/usermodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from "../middlewares/sendMail.js"
import TryCatch from "../middlewares/trycatch.js"

export const register=async(req,res)=>{
    try {
        const {email,name,password}= req.body

        let user= await User.findOne({email})
        if(user) return res.status(400).json({
            message:"user allready exist"
        })

        const hashpassword=await bcrypt.hash(password,10)

        user={
            name,
            email,
            password:hashpassword
        }
        const otp=Math.floor(Math.random()*1000000)

        const JWTToken=jwt.sign({
            user,
            otp
        },process.env.JWT_secret,{
            expiresIn:"5m"
        })

        const data={
            name,otp
        }
        await sendMail(
            email,
            "e learning",
            data
        )
        res.status(200).json({
            message:"otp send to your mail",
            JWTToken
        })
       
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

export const verifyuser =TryCatch(async(req,res)=>{
    const {otp,JWTToken}=req.body

    const verify=jwt.verify(JWTToken,process.env.JWT_secret)

    if(!verify) return res.status(400).json({
        message:"otp expired"
    })

    if(verify.otp!==otp) return res.status(400).json({
      message: "wrong otp",
    }); 

    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password
    })
    res.json({
        message:"user registered"
    })
})

export const loginuser=TryCatch(async(req,res)=>{
    const {email, password}=req.body

    const user= await User.findOne({email})
    if(!user) return res.status(400).json({
        message:"user not found"
    })

    const matchpassword=await bcrypt.compare(password,user.password)
    if(!matchpassword) return res.status(400).json({
        message:"wrong password"
    })

    const token= jwt.sign({_id:user._id},process.env.JWT_sec,{
        expiresIn:"15d"
    })
    res.json({
        message:`welcome back ${user.name}`,
        token,
        user
    })
})

export const myProfile=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)
    res.json({user})
})