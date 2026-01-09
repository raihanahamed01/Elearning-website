import React from 'react'
import "./paymentsuccess.css"
import { Link, useParams } from 'react-router-dom'

const Paymentsuccess = ({user}) => {
    const params=useParams()
  return <div className='payment-success-page'>
  {user && <div className='success-message'>
    <h2>Payment Successful</h2>
    <p>Your course subscription has been activated</p>
    <p>Reference No- {params.id}</p>
    <Link to={`${user._id}/dashboard`} className='common-btn'>Go To Dashboard</Link>
  </div>}


  </div>
}

export default Paymentsuccess
