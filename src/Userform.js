import React from 'react'
import './Userform.css'
import axios from 'axios';

export default function Userform({noofseats,onBack}) {


let i=noofseats.length-1;

const handleGoBack=()=>{
  onBack();
}

async function savebookings(data){
  try{
      const savedata=await axios.post('http://localhost:8000/savedBookings',data);
      console.log('data saved',savedata);

  }
  catch(error){
      console.log('error',error);
  }
}
const handleFormSubmit=async(event)=>{
  event.preventDefault();
  const formElement=event.target.closest('form');
  if(formElement){
    const formData=new FormData(event.target);
    for(let index=2;index<=i+1;index++)
    {
      const passengerFullName=`passenger${index}FullName`;
      const passengerValue=formData.get(passengerFullName);
      if(passengerValue){
        formData.set(passengerFullName,passengerValue);
      }
    }
    // formElement.dispatchEvent(new Event('submit'));
    
    formElement.submit();
  
  
await savebookings(formData);
  }
}

  return (
    <div class="login-box" style={{width:'500px',height:'600px'}}>
    <button onClick={handleGoBack}>back</button>      
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
      <div class="user-box">
        <input type="number" name="age" required=""/>
        <label>Age:</label>
      </div>
      
      <a href="#" type='submit'>
             Make Payment
         <span></span>
      </a></center>
    </form>
  </div>
  )
}
