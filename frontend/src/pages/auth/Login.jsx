import React, { useState } from 'react'
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { Userdata } from '../../context/Usercontext.jsx';
import { Coursedata } from '../../context/Coursecontext.jsx';

const Login = () => {
  const navigate=useNavigate()
  const {btnLoading,loginuser}=Userdata()

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const { fetchmycourse } = Coursedata();
  const submitHandler=async(e)=>{
    e.preventDefault()
    await loginuser(email, password, navigate, fetchmycourse);
  }

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            maxLength="8"
            required
          />

          <button className="common-btn" type='submit' disabled={btnLoading}>
            {btnLoading? "Please wait..." : "Login"}
          </button>
        </form>
        <p>
          Don't Have An Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login
