import React, { useEffect, useState } from 'react'
import "./coursedescription.css"
import { useNavigate, useParams } from 'react-router-dom'
import { Coursedata } from '../../context/Coursecontext.jsx'
import { server } from '../../main.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Userdata } from '../../context/Usercontext.jsx'
import Loading from '../../components/loading/Loading.jsx'

const Coursedescription = ({user}) => {
    const navigate=useNavigate()
    const params=useParams()
    const [loading,setLoading]=useState(false)
    const {fetchuser}=Userdata()

    const { fetchcourse, course, fetchcourses ,fetchmycourse} = Coursedata();
    useEffect(()=>{
        fetchcourse(params.id)
    },[])
    const checkoutHandler=async()=>{
      const token=localStorage.getItem("token")
      setLoading(true)

      const {data:{order}}=await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
        headers:{
          token
        }
      })
      const options = {
        key: "rzp_test_Ryz9K6GNIRxAcT", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits.
        currency: "INR",
        name: "E Learning", //your business name
        description: "Learn With Us",

        order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1

        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );
            await fetchuser();
            await fetchcourses();
            await fetchmycourse()
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: {
          color: "#8a4baf",
        },
      };
      const razorpay=new window.Razorpay(options)
      
      razorpay.on("payment.failed", function (response) {
        toast.error("Payment Failed");
        setLoading(false);
      });

      razorpay.on("modal.dismiss", function () {
        toast.error("Payment Cancelled");
        setLoading(false);
      });

      razorpay.open()

    }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor- {course.createdby}</p>
                  <p>Duration- {course.duration} weeks</p>
                </div>
              </div>
              <p>{course.description}</p>
              <p>Let's Get Started With Course At Just ₹{course.price}</p>
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn">
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Coursedescription
