import express from 'express'
import { isAdmin, isAuth } from '../middlewares/isAuth.js'
import { addLectures, createCourse, deleteCourse, deleteLecture, getallstats, getallusers, updaterole } from '../controllers/admincontroller.js'
import { uploadFiles } from '../middlewares/multer.js'

const router=express.Router()

router.post("/course/new",isAuth, isAdmin,uploadFiles,createCourse)
router.post("/course/:id",isAuth, isAdmin,uploadFiles,addLectures)
router.delete("/course/:id",isAuth, isAdmin,deleteCourse)
router.delete("/lecture/:id",isAuth, isAdmin,deleteLecture)
router.get("/stats",isAuth, isAdmin,getallstats)
router.get("/users",isAuth, isAdmin,getallusers)
router.put("/user/:id",isAuth, isAdmin,updaterole)


export default router