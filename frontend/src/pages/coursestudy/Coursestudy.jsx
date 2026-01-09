import React, { useEffect } from 'react'
import "./coursestudy.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Coursedata } from '../../context/Coursecontext.jsx'
import { server } from '../../main.jsx'

const Coursestudy = ({user}) => {
    const params =useParams()

    const { fetchcourse ,course} = Coursedata();
    const navigate=useNavigate()

    if(user && user.role !== "admin" && !user.subscription.includes(params.id)) return navigate("/")

    useEffect(()=>{
        fetchcourse(params.id)
    },[])
  return <>
    {
        course && <div className='course-study-page'>
            <img src={`${server}/${course.image}`} alt='' width={350} / >
            <h2>{course.title}</h2>
            <h4>{course.description}</h4>
            <h5>by-{course.createdby}</h5>
            <h5>Duration-{course.duration} weeks</h5>
            <Link to={`/lectures/${course._id}`}>
                <h2>Lectures</h2>
            </Link>
        </div>

    }
  </>
}

export default Coursestudy
