import React from 'react'
import { useState } from 'react';
export default function DropDownTo({handleToChange}) {
  
  const[toValue,setToValue]=useState('');
  const handleChange=(e)=>{
    e.preventDefault();
    const seletedvalue=e.target.value;
    setToValue(seletedvalue);
    handleToChange(seletedvalue);
  }
  return (
    <div className='dropDownContent' onChange={handleChange}>
    <select value={toValue}>
      <option>Sunday</option>
    </select>
  </div>
  )
}

