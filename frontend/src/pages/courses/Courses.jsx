import React from 'react'
import "./courses.css"
import { Coursedata } from '../../context/Coursecontext.jsx'
import Coursecard from '../../components/coursecard/Coursecard.jsx'

import { server } from '../../main.jsx'

const Courses = () => {
    const {courses}=Coursedata()
  return (
    <div className='courses'>
    <h2>Available Courses</h2>
    <div className='course-container'>
        {
            courses && courses.length>0 ? courses.map((e)=>(
                <Coursecard key={e._id} course={e} server={server}/>
            )): <p>No Courses Yet</p>
        }
    </div>
      
    </div>
  )
}

export default Courses
