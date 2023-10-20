import React,{useEffect, useState} from 'react'

import axios from 'axios';
import './Dropdown.css';


export default function DropDownFrom({handleFromChange}) {
  const[fromValue,setFromValue]=useState('');
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
  const selectedValue=e.target.value;
  setFromValue(selectedValue);
  handleFromChange(selectedValue);
}


  return (
    <div className='dropDownContent' >
        <select value={fromValue} onChange={handleChange}>
          {cityNames.map((item,index)=>(<option key={index}>{item}</option>))}

        </select>
      
      </div>
  )
}
