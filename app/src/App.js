import logo from './logo.svg';
import './App.css';
import Top from './Top.js';
import { useState } from 'react';
import Body from './Body.js';
import Login from './Login.js';
import SignUp from './SignUp.js';

function App({setCityCode, cityCode, setNav, nav}) {
  return ( // used to display - each function has only 1 return statement
           //Multiple input in react
    <>
      {
        nav === 0 && <Body setNav = {setNav} setCityCode = {setCityCode} cityCode = {cityCode}/> 
      }
      {
        nav === 1 && <Login setNav = {setNav}/>
      }
      {
        nav === 2 && <SignUp setNav = {setNav}/>
      }
    </>
  );
}

export default App;
