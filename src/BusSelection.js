import React, { useCallback, useMemo } from 'react'
import Header from './Header'
import './busSeletion.css'
import axios from 'axios';
import { useState,useEffect ,useRef} from 'react';
import Userform from './Userform';

export default function () {
const routeId='',date='';
  const[disabled,setDisabled]=useState(false);
  const[backgroundColor,setBackgroundColor]=useState('white');
  const localStorageKey=`busSeletionSeatColors_${routeId}_${date}`;
  const[showSeats,setShowSeats]=useState(false);
  const[secondPopup,setSecondPopup]=useState(false);
  const[selectedSeats,setSelectedSeats]=useState([]);
  const dialogRef=useRef(null);

  let a='ChIJL_P_CXMEDTkRw0ZdG-0GVvw';
let b='ChIJbU60yXAWrjsR4E9-UejD3_g';
let c=1673980200000;
  const[tripData,setTripData]=useState([]);

  useEffect(() => {
    async function getTripDetails(){
      try{
        const tripdata=await axios.get('http://localhost:8000/tripdetails');
        setTripData(tripdata.data);
      }
      catch(error){
        console.log('error::',error);
      }
    }
    getTripDetails();
  
    
  }, [])
  
  
  const tripfilter=tripData.filter((tripItem)=>{return(tripItem.from===a && tripItem.to===b && tripItem.date===c)});
  let i=40;
  let finalseatcolors=[];

  const seatColorInitialization=()=>{
    const previousSeatColors=localStorage.getItem(localStorageKey);
    return previousSeatColors ?JSON.parse(previousSeatColors):Array(40).fill('white');
  }
const[seatColor,setSeatColor]=useState(()=>seatColorInitialization());
  // const seatColor=useMemo(()=>seatColorInitialization(),[]);

  
  const blockseat=()=>{
    finalseatcolors=[...seatColor];
    localStorage.setItem(localStorageKey,JSON.stringify(finalseatcolors));
    console.log(finalseatcolors);
    console.log('selectedseats',selectedSeats);
    setShowSeats(false)
    setSecondPopup(true);
    
    
  }
  const toggleseatcolors=(index)=>{
      const updatedSeatColors = [...seatColor];
  updatedSeatColors[index] = updatedSeatColors[index] === 'white' ? 'black' : 'white';
  setSeatColor(updatedSeatColors);

    if(updatedSeatColors[index]==='black')
    {
      setSelectedSeats([...selectedSeats,index]);

    }
    else{
      setSelectedSeats(selectedSeats.filter((seatno)=>seatno!==index));
    }
console.log('s',selectedSeats)
  }

  

  const handleBookClick = () => {
    setShowSeats(true); // This is the correct place to set showSeats to true
    dialogRef.current.showModal();
  };
const handleClosePopup = () => {
    // setShowSeats(false);
    dialogRef.current.close();
    setSecondPopup(false);
  };
  return (
    <div>
        <Header/>
        <div className='sidebar'>
            
        </div>
        <div className='middlebar'>
        {tripfilter.map((item)=>(
          <div className='card'>
           
              <div key={item._id}>
               <h1>{item.busName}</h1>
               <h2>Departure:{item.startTime}</h2>
               <h2>ArrivalTime:{item.EndTime}</h2>
               <h3>Price:{item.busFare}</h3>
               <h1>animeties:{item.animeties_list}</h1>
               <button onClick={handleBookClick}>Book</button>
               </div>
               </div>
            ))}
           
           {/* {showSeats && ( */}
              <div className='popup-overlay' >
                
                <dialog id='modal' ref={dialogRef} style={{width:'500px',height:'400px'}}>
                  
                <div className='popup'>
                  <button className='close-button' onClick={handleClosePopup}>
                    Close
              </button>
              
               <div className='seatcard'>
     {Array.from({length:i}).map((_,index)=>(
          <button key={index} onClick={()=>toggleseatcolors(index)} style={{backgroundColor:seatColor[index]}}>Seat {index+1}</button>
     ))}
     <button onClick={()=>blockseat()}>Confirm Booking</button>
      </div>

      </div>
      
            {/* )} */}
            {secondPopup && (
               <div className='popup-overlay'>
               <div className='popup'>
                <Userform noofseats={selectedSeats}/>
                </div>
                </div>
            )}
            </dialog>
      </div>
        </div>
        
    </div>
  )
}
