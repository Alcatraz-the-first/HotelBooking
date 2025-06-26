import logo from './logo.svg';
import './App.css';
import Top from './Top.js';
import { useState } from 'react';
import Body from './Body.js';
import Login from './Login.js';
import SignUp from './SignUp.js';

function App({setCityCode, cityCode}) {
  const [nav, setNav] = useState(0);
  return ( // used to display - each function has only 1 return statement
           //Multiple input in react
    <>
      {
        nav === 0 && <Body setNav1 = {setNav} setCityCode = {setCityCode} cityCode = {cityCode}/> 
      }
      {
        nav === 1 && <Login setNav1 = {setNav}/>
      }
      {
        nav === 2 && <SignUp setNav1 = {setNav}/>
      }
    </>
  );
}

export default App;
