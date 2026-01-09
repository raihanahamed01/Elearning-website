import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main.jsx";

const Coursecontext=createContext()

export const Coursecontextprovider=({children})=>{
    
    const [courses,setCourses]=useState([])
    const [course,setCourse]=useState([])
    const [mycourse,setMycourse]=useState([])

    async function fetchcourses(){
        try {
            const {data}=await axios.get(`${server}/api/course/all`)
            setCourses(data.courses)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    async function fetchcourse(id){
        try {
            const {data}=await axios.get(`${server}/api/course/${id}`)
            setCourse(data.course)
            
        } catch (error) {
            console.log(error)
            
        }

    }
    async function fetchmycourse(){
        try {
            const {data}=await axios.get(`${server}/api/mycourse`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setMycourse(data.courses)
            
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        fetchcourses()
        fetchmycourse()
    },[])

    return <Coursecontext.Provider value={{courses, fetchcourses,fetchcourse,
    course,mycourse,fetchmycourse,}}>{children}</Coursecontext.Provider>

}

export const Coursedata=()=> useContext(Coursecontext)