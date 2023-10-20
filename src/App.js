// import React from 'react';
// import {useState,useEffect} from 'react'
// import {Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; 
// import './App.css'
// import Header from './Header';
// import axios from 'axios';
// import BusSelection from './BusSelection';

// import DropDownFrom from './DropDownFrom';
//  import DropDownTo from './DropDownTo';


//  function App() {

//   const[fromValue,setFromValue]=useState('Pune');

//   const[toValue,setToValue]=useState('Banglore');

//   const[date,setDate]=useState(0.0001977261492832427);
  


//   const handleFromChange=(seletedValue)=>{
   
//     setFromValue(seletedValue);
//   }
//   const handleToChange=(seletedValue)=>{

//     setToValue(seletedValue);
//   }

// const handleDateChange=(event)=>{
//   let p=event.target.value;
//    setDate(p);
  
// }
//   return (
//     <Router>
//     <div className="App">
     
// <Header/>
// {/* <div className='track'></div> */}

//       <div className='background-animation'>
//       <div className='text'>
//   <h1>Book buses from the comfort of your home</h1>
// </div>
//      <div className='circle'>
//      <div className='circle2'>
      
//       </div>
//      </div>
    
   
//       <div className='dropDownContent' >
//         <DropDownFrom handleFromChange={handleFromChange}/>
//         <DropDownTo handleToChange={handleToChange}/>
//         <input type="date" className="date-input" value={date} onChange={handleDateChange}/>
        
//       </div>
//       <Link to='/busseletion'>
//       <button className="go">Go to Bus Selection</button></Link>
//       </div>

//       <div className='dropDownContent' >
//         {/* <DropDownTo/> */}
//       </div>
   
//       {/* <Link to="/bus-selection">
//           <button className="go">Go to Bus Selection</button>
//         </Link>
//         <Route path="/bus-selection" component={BusSelection} /> */}
//       <div>
//         {/* <BusSelection fromValue={fromValue} toValue={toValue} datewithseperator={date}/> */}
//       </div>
//       </div>
//       <Routes>
//         <Route exact path='/busseletion' element={<BusSelection/>}></Route>
//       </Routes>
//        </Router>    
//   );
  
// }

// export default App;
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import './App2.css';
import Header from './Header';
import BusSelection from './BusSelection';
import DropDownFrom from './DropDownFrom';
import DropDownTo from './DropDownTo';

function App() {
  const [fromValue, setFromValue] = useState('Ahmedabad');
  const [toValue, setToValue] = useState('Agra');
  const [date, setDate] = useState(''); // Changed to string to store date as a string
  const[finalDate,setFinalDate]=useState();
  const handleFromChange = (selectedValue) => {
    setFromValue(selectedValue);
  };

  const handleToChange = (selectedValue) => {
    setToValue(selectedValue);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    console.log(selectedDate);
    const datefilter=selectedDate.replace(/[-/]/g,'');
    const dateint=parseInt(datefilter);
    setFinalDate(dateint);
  };

  return (
    <Router>
      <div className='Header'><Header /></div>
      <div className="App" >
        

        <div className="background-animation">
          <div className="text">
            <h1>Book buses from the comfort of your home</h1>
          </div>
          <div className="circle">
            <div className="circle2"></div>
          </div>

          <div className="dropDownContent">
            <DropDownFrom handleFromChange={handleFromChange} />
            <DropDownTo handleToChange={handleToChange} />
            <input
              type="date"
              className="date-input"
              value={date}
              onChange={handleDateChange}
            />
          </div>

          <Link to="/busselection">
            <button className="go">Go to Bus Selection</button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route
          path="/busselection"
          element={<BusSelection fromValue={fromValue} toValue={toValue} datewithseperator={finalDate} />}
        />
        <Route path="/" element={<Outlet />} />
      </Routes>
    </Router>
  );
}

export default App;
