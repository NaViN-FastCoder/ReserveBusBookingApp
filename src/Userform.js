import React from 'react'
import './Userform.css'
import axios from 'axios';

export default function Userform({noofseats}) {


let i=noofseats.length-1;


async function savebookings(data){
  try{
      const savedata=await axios.post('http://localhost:8000/savrdbookings',data);
      console.log('data saved',savedata);

  }
  catch{
      console.log('error',error);
  }
}
const handleFormSubmit=async(event)=>{
  event.preventDefault();
  const formData=new FormData(event.target);
await savebookings(formData);
}

  return (
    <div class="login-box">
 
    <form onSubmit={handleFormSubmit}>
      <div class="user-box">
      
        <input type="text" name="" required=""/>
        <label>Passenger 1 Full Name</label>
      </div>
      {Array.from({length:i}).map((_,index)=>(
        <div class="user-box">
        <input type="text" name={`passenger${index+2}FullName`} required="" />
        <label>Passenger {index+2} Full Name</label>
      </div>
      ))}
      
      <div class="user-box">
        <input type="email" name="email" required=""/>
        <label>Email</label>
      </div><center>
      <div class="user-box">
        <input type="number" name="mobile" required=""/>
        <label>Mobile:</label>
      </div>
      
      <a href="#" type='submit'>
             Make Payment
         <span></span>
      </a></center>
    </form>
  </div>
  )
}
