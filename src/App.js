import React from 'react';
import './App.css';
import Header from './Header';
import axios from 'axios';
import BusSelection from './BusSelection';
import {useState,useEffect} from 'react'
import DropDownFrom from './DropDownFrom';
 import DropDownTo from './DropDownTo';
import {Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

 function App() {

  const[fromValue,setFromValue]=useState('');

  const[toValue,setToValue]=useState('');
  


  const handleFromChange=(seletedValue)=>{
   
    setFromValue(seletedValue);
  }
  const handleToChange=(seletedValue)=>{

    setToValue(seletedValue);
  }


  return (
    
    <div className="App">
     
<Header/>
      <div className='middleContent'>
      <div className='dropDownContent' >
        <DropDownFrom handleFromChange={handleFromChange}/>
        <DropDownTo handleToChange={handleToChange}/>
      </div>
      </div>

      <div className='dropDownContent' >
        {/* <DropDownTo/> */}
      </div>
    
   
      {/* <Link to="/bus-selection">
          <button className="go">Go to Bus Selection</button>
        </Link>
        <Route path="/bus-selection" component={BusSelection} /> */}
      <div>
        <BusSelection />
      </div>
      </div>
      
      // </Router>    
  );
  
}

export default App;
