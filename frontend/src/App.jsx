import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Header from './components/header/Header.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Verify from './pages/auth/Verify.jsx'
import Footer from './components/footer/Footer.jsx'
import About from './pages/about/About.jsx'
import Account from './pages/account/Account.jsx'
import { Userdata } from './context/Usercontext.jsx'
import Loading from './components/loading/Loading.jsx'
import Courses from './pages/courses/Courses.jsx'
import Coursedescription from './pages/coursedescription/Coursedescription.jsx'
import Paymentsuccess from './pages/paymentsuccess/Paymentsuccess.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Coursestudy from './pages/coursestudy/Coursestudy.jsx'
import Lecture from './pages/lecture/Lecture.jsx'
import AdminDashboard from './admin/dashboard/AdminDashboard.jsx'
import Admincourses from './admin/courses/Admincourses.jsx'
import Adminusers from './admin/users/Adminusers.jsx'


const App = () => {
  const {isAuth,user, loading}=Userdata()
  
  return (
    <>
      {loading?(<Loading/>):
      (<BrowserRouter>
        <Header isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={isAuth ? <Home /> : <Register />} />
          <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          <Route path="/course/:id" element={isAuth ? <Coursedescription user={user}/>: <Login />} />
          <Route path="/payment-success/:id" element={isAuth ? <Paymentsuccess user={user}/>: <Login />} />
          <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user}/>: <Login />} />
          <Route path="/course/study/:id" element={isAuth ? <Coursestudy user={user}/>: <Login />} />
          <Route path="/lectures/:id" element={isAuth ? <Lecture user={user}/>: <Login />} />
          <Route path="/admin/dashboard" element={isAuth ? <AdminDashboard user={user}/>: <Login />} />
          <Route path="/admin/course" element={isAuth ? <Admincourses user={user}/>: <Login />} />
          <Route path="/admin/users" element={isAuth ? <Adminusers user={user}/>: <Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>)}
    </>
  );
}

export default App
