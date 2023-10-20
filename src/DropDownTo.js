import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import './Dropdown.css';
export default function DropDownTo({handleToChange}) {
  
  const[toValue,setToValue]=useState('');
  const[cityNames,setCityNames]=useState([]);
  useEffect(()=>{
    async function fetchurl(){
      try{
        const citynames=await axios.get('http://localhost:8000/citynames');setCityNames(citynames.data);
      }
      catch(error){console.log('error',error)}
    }
    fetchurl();
  },[])
  const handleChange=(e)=>{
    e.preventDefault();
    const seletedvalue=e.target.value;
    setToValue(seletedvalue);
    handleToChange(seletedvalue);
  }
  return (
    <div className='dropDownContent' onChange={handleChange}>
   <select value={toValue} onChange={handleChange}>
          {cityNames.map((item,index)=>(<option key={index}>{item}</option>))}
          
        </select>
  </div>
  )
}

