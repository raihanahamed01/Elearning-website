import React from 'react'
import "./footer.css"
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
        <div className='footer-content'>
            <p>
                &copy; 2026 your E-learning platform. All rights resersved.<br/
                > Made with ❤️ <a href=''>Raihan Ahamed</a>
            </p>
            <div className='social-links'>
                <a href=''><ImFacebook2/></a>
                <a href=''><FaInstagram/></a>
                
            </div>
        </div>
    </footer>
  
  )
}

export default Footer
