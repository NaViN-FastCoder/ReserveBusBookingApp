import React from 'react'
import './header.css'
import vectorBusIcon from './vector-bus-icon.jpg'
export default function Header() {
  return (
    <div className='header'>
    <img src={vectorBusIcon} alt="logo" className='imgsrc'/>
    <h1 className='header-title'>Reserve</h1>
    <h1 className='header-title'>Book</h1>
    <div className='innerBox'></div>
  </div>
  )
}
