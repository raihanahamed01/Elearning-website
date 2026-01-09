import React, { useState } from 'react'
import "./auth.css"
import { Link, useNavigate } from "react-router-dom";
import { Userdata } from '../../context/Usercontext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registeruser } = Userdata();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    await registeruser(name,email, password, navigate);
  };
  return (
    <div>
      <div className="auth-page">
        <div className="auth-form">
          <h2>Register</h2>
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              required
            />
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

            <button type='submit' disabled={btnLoading} className="common-btn">{btnLoading?"Please Wait...":"Register"}</button>
          </form>
          <p>
            Already Have An Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register
