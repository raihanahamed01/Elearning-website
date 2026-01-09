import React, { useEffect, useState } from 'react'
import "./adminusers.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main.jsx'
import Layout from '../utils/Layout.jsx'

import toast from 'react-hot-toast'

const Adminusers = ({user}) => {
    const navigate=useNavigate()

    if(user && user.role!=="admin") return navigate("/");
   
    const [users,setUsers]=useState([])

    async function fetchusers(){
        try {
            const {data}=await axios.get(`${server}/api/users`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })

            setUsers(data.users)

            
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        fetchusers()
    },[])
    const updaterole=async(id)=>{
        if(confirm("are you sure to update this user's role")){
            try {
                const {data}=await axios.put(`${server}/api/user/${id}`,{},{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                })
                toast.success(data.message)
                fetchusers()
                
            } catch (error) {
                toast.error(error.response.data.message)
                
            }
        }
    }

    console.log(users)
  return (
    <Layout>
        <div className='users'>
            <h1>All Users</h1>
            <table border={"black"}>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>name</td>
                        <td>email</td>
                        <td>role</td>
                        <td>update role</td>
                    </tr>
                </thead>
                {
                    users && users.map((e,i)=>(
                        <tbody>
                            <tr>
                                <td>{i+1}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td>
                                    <button onClick={()=>updaterole(e._id)} className='common-btn'>Update Role</button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    </Layout>
  )
}

export default Adminusers
