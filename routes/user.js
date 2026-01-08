import express from 'express'
import { loginuser, myProfile, register, verifyuser } from '../controllers/usercontroller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router=express.Router()

router.post("/user/register",register)
router.post("/user/verify",verifyuser)
router.post("/user/login",loginuser)
router.get("/user/me",isAuth, myProfile)

export default router