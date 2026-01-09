import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { server } from "../main.jsx";
import toast, {Toaster} from 'react-hot-toast'

const Usercontext=createContext()

export const Usercontextprovider=({children})=>{
    const [user,setUser]=useState([])
    const [isAuth,setIsAuth]=useState(false)
    const [btnLoading,setBtnLoading]=useState(false)
    const [loading,setLoading]=useState(true)

    async function loginuser(email, password, navigate, fetchmycourse) {
      setBtnLoading(true);
      try {
        const { data } = await axios.post(`${server}/api/user/login`, {
          email,
          password,
        });

        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        setBtnLoading(false);
        navigate("/");
        fetchmycourse()
      } catch (error) {
        setBtnLoading(false);
        setIsAuth(false);
        toast.error(error.response.data.message);
      }
    }


    async function registeruser(name,email, password, navigate) {
      setBtnLoading(true);
      try {
        const { data } = await axios.post(`${server}/api/user/register`, {
          name,
          email,
          password,
        });

        toast.success(data.message);
        localStorage.setItem("JWTToken", data.JWTToken);
        
        setBtnLoading(false);
        navigate("/verify");
      } catch (error) {
        setBtnLoading(false);
        
        toast.error(error.response.data.message);
      }
    }

    async function verifyOtp (otp,navigate){
      setBtnLoading(true);
      const JWTToken = localStorage.getItem("JWTToken");
      try {
         const { data } = await axios.post(`${server}/api/user/verify`, {
           otp,
           JWTToken,
         });

         toast.success(data.message);
         
         navigate("/login")
         setBtnLoading(false);
         localStorage.clear()
        
      } catch (error) {
        setBtnLoading(false);

        toast.error(error.response.data.message);
        
      }
    }

    async function fetchuser(){
        try {
            const {data}=await axios.get(`${server}/api/user/me`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setIsAuth(true)
            setUser(data.user)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchuser()
    },[])
    return (
      <Usercontext.Provider
        value={{
          user,
          setUser,
          setIsAuth,
          isAuth,
          loginuser,
          btnLoading,
          loading,
          registeruser,
          verifyOtp,
          fetchuser,
        }}
      >
        {children}
        <Toaster />
      </Usercontext.Provider>
    ); 
}

export const Userdata=()=>useContext(Usercontext)