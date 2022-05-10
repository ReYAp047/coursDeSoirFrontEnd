import React, { useState } from 'react'
import './sideBar.css'
import { AiOutlineHome } from 'react-icons/ai'
import { RiFolderReduceLine } from 'react-icons/ri'
import { MdReduceCapacity } from 'react-icons/md'
import { MdTimeline } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { MdOutlineFeedback } from 'react-icons/md'
import { TiMessages } from 'react-icons/ti'
import { MdLiveTv } from 'react-icons/md'
import { MdReportGmailerrorred } from 'react-icons/md'
import { BsArrowBarLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [navHover, setNavHover] = useState("home")
  
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <BsArrowBarLeft className='toggle-btn' onClick={toggle}/>
        {/* <BsArrowBarRight/> */}
        <div className="sidebar-menu">
          <h3 className='sidebar-title'>Dashbord</h3>
          <ul className="sidebar-list">
          <Link to="/"  className='sidebar-item'> 
            <li onClick={() => setNavHover("home")} className={ navHover === 'home' ? "sidebar-list-item active" : "sidebar-list-item" }>
              <AiOutlineHome className='sidebar-icon'/> 
             <span>Home</span>
            </li>
          </Link>
          <Link to="/cours" className='sidebar-item'>
            <li onClick={() => setNavHover("cours")} className={ navHover === 'cours' ? "sidebar-list-item active" : "sidebar-list-item" } >
              <RiFolderReduceLine className='sidebar-icon'/> 
              <span>Cours</span> 
            </li>
          </Link>
          <Link to="/students" className='sidebar-item' >
             <li  onClick={() => setNavHover("students")} className={ navHover === 'students' ? "sidebar-list-item active" : "sidebar-list-item" }>
              <MdReduceCapacity className='sidebar-icon'/> 
              <span>Students</span> 
            </li>
          </Link>
            <li className="sidebar-list-item">
              <MdTimeline className='sidebar-icon'/> Analystics
            </li>
          </ul>
          </div>
          <div className="sidebar-menu">
          <h3 className='sidebar-title'>Notification</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <AiOutlineMail className='sidebar-icon'/> Mail
            </li>
            <li className="sidebar-list-item">
              <MdOutlineFeedback className='sidebar-icon'/> Feedback
            </li>
            <li className="sidebar-list-item">
              <TiMessages className='sidebar-icon'/> Messages
            </li>
          </ul>
          </div>
          <div className="sidebar-menu">
          <h3 className='sidebar-title'>Classroom</h3>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <MdLiveTv className='sidebar-icon'/> Live
            </li>
            <li className="sidebar-list-item">
              <MdReportGmailerrorred className='sidebar-icon'/> Reports
            </li>
          </ul>
          </div>
        </div>
    </div> 
  )
}

export default SideBar