import React from 'react'
import "./dashboard.css"
import { Coursedata } from '../../context/Coursecontext.jsx'
import Coursecard from '../../components/coursecard/Coursecard.jsx'

const Dashboard = () => {
    const {mycourse}=Coursedata()
  return <div className='student-dashboard'>
    <h2>All Enrolled Courses</h2>
    <div className='dashboard-content'>
        {
            mycourse && mycourse.length>0 ? mycourse.map((e)=>(
                <Coursecard key={e._id} course={e}/>
            )): <p>No Courses Enrolled Yet</p>
        }
    </div>
  </div>
}

export default Dashboard
