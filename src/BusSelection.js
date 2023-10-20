import React, { useCallback, useMemo } from 'react'
import Header from './Header'
import './busSeletion.css'
import axios from 'axios';
import { useState,useEffect ,useRef} from 'react';
import Userform from './Userform';

export default function ({fromValue,toValue,datewithseperator}) {
const routeId='';
const[date,setDate]=useState(20240218);

  const[disabled,setDisabled]=useState(false);
  const[backgroundColor,setBackgroundColor]=useState('white');
  const localStorageKey=`busSeletionSeatColors_${routeId}_${date}`;
  const[showSeats,setShowSeats]=useState(false);
  const[secondPopup,setSecondPopup]=useState(false);
  const[selectedSeats,setSelectedSeats]=useState([]);
  const dialogRef=useRef(null);

//   let a='ChIJL_P_CXMEDTkRw0ZdG-0GVvw';
// let b='ChIJbU60yXAWrjsR4E9-UejD3_g';
//let c=0.0001977261492832427;

// useEffect(()=>{
//   console.log('USeEffect');
//   if (datewithseperator){
//   let p=datewithseperator;
//   const datewithoutseperators=p.replace(/[-/]/g,'');
//   const q=parseInt(datewithoutseperators);
//   setDate(q);
//   console.log('useInside',date);
//   console.log(typeof(date));
//   console.log('q',typeof(q));
// }},[datewithseperator])

let a=fromValue;
let b=toValue;

 let c=date;
  const[tripData,setTripData]=useState([]);
  const[tripFilter,setTripFilter]=useState([]);
  useEffect(() => {
    async function getTripDetails(){
      try{
        const tripdata=await axios.get('http://localhost:8000/tripdetails');
        setTripData(tripdata.data);
        console.log(tripdata.data);
      }
      catch(error){
        console.log('error::',error);
      }
    }
    getTripDetails();
  
    
  }, [])
  
  useEffect(()=>{
    const tripfilter2=tripData.filter((tripItem)=>{return(tripItem.from===fromValue && tripItem.to===toValue && tripItem.date===datewithseperator)});
    setTripFilter(tripfilter2);
  },[fromValue,toValue,datewithseperator,tripData])
 

  console.log('FilteredData',tripFilter);
  console.log('fromvalue',fromValue);
  console.log('tovalue',toValue);
  console.log('datecoming',datewithseperator);
    let i=32;
  let finalseatcolors=[];

  const seatColorInitialization=()=>{
    const previousSeatColors=localStorage.getItem(localStorageKey);
    return previousSeatColors ?JSON.parse(previousSeatColors):Array(32).fill('white');
  }
const[seatColor,setSeatColor]=useState(()=>seatColorInitialization());
  // const seatColor=useMemo(()=>seatColorInitialization(),[]);

  
  const blockseat=()=>{
    finalseatcolors=[...seatColor];
    localStorage.setItem(localStorageKey,JSON.stringify(finalseatcolors));
    console.log(finalseatcolors);
    console.log('selectedseats',selectedSeats);
    setShowSeats(false);
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

  const handleGoBack=()=>{
    setSecondPopup(false);
    setShowSeats(true);
  }

  return (
    <div>
        {/* <Header/> */}
        <div className='sidebar'>
            
        </div>
        <div className='middlebar'>
        {tripFilter.map((item)=>(
          <div className='card'>
           
              <div key={item._id}>
               <h1 className='middle'>{item.busName}</h1>
               {/* <h2 className='left'>Departure:{item.startTime}
               Category:{item.category}</h2> */}
                <h2 className='left'>
  <span className="departure">Departure: {item.startTime}</span>
  <span className="category">Category: {item.category}</span>
</h2>

<h2 className='right'>
  <span className="arrival">ArrivalTime:{item.endTime}</span>
  <span className="anemities">animeties:{item.animeties_list.join(', ')}</span>
</h2>


               {/* <h5 className='right'>animeties:{item.animeties_list.join(', ')}</h5>
               <h3 className='right'>ArrivalTime:{item.endTime}</h3> */}
               
               <h4>Price:{item.busFare}</h4>
               
               <button className='book' onClick={handleBookClick}>Book</button>
               </div>
               </div>
            ))}
           
           {/* {showSeats && ( */}
              <div className='popup-overlay' >
                
                <dialog id='modal' ref={dialogRef} style={{width:'500px',height:'450px'  }}>
                  
                <div className='popup'>
                  <button className='close-button' onClick={handleClosePopup}>
                   <span>&times;</span>
              </button>
              
               <div className='seatcard'>
     {Array.from({length:i}).map((_,index)=>(
          <button key={index}  onClick={()=>toggleseatcolors(index)} style={{backgroundColor:seatColor[index]}}>Seat {index+1}</button>
     ))}
     <button className='confirmseat' onClick={()=>blockseat()}>Confirm Booking</button>
      </div>

      </div>
      
            {/* )} */}
            {secondPopup && (
               <div className='popup-overlay'>
               <div className='popup'>
                <Userform noofseats={selectedSeats} onBack={handleGoBack}/>
                </div>
                </div>
            )}
            </dialog>
      </div>
        </div>
        
    </div>
  )
}
