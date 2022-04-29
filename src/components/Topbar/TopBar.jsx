import React from 'react'
import './topBar.css'
import { CgAdd } from 'react-icons/cg'

const TopBar = () => {
  return (
    <div className='topbar'>
      <div className='topbar-container'>
        <div className='leftside'>
          <span className='logo1'>Etu</span>
          <span className='logo2'>dini</span>
        </div>
        <div className='rightside'>
          <CgAdd className='addBtn'/>
        </div>
      </div>
    </div>
  )
}

export default TopBar