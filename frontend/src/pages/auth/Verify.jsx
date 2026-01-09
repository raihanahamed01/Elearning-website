import React, { useState } from 'react'
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { Userdata } from '../../context/Usercontext.jsx'

const Verify = () => {
  const [otp,setOtp] = useState("")
  const {btnLoading,verifyOtp}=Userdata()
  const navigate=useNavigate()
    const submitHandler = async (e) => {
      e.preventDefault();
      await verifyOtp(Number(otp),navigate)
    };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type='submit' disabled={btnLoading} className="common-btn">{btnLoading?"Please wait...":"Verify"}</button>
        </form>
        <p>
          Go To <Link to="/login">Login</Link> Page
        </p>
      </div>
    </div>
  );
}

export default Verify
