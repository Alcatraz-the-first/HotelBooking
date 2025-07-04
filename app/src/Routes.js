import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './App.js';
import HotelDetails from './HotelDetails.js';
import { useState , useEffect } from 'react';

export default function App() {
  const [cityCode, setCityCode] = useState(() => localStorage.getItem('cityCode') || '');
  const [nav, setNav] = useState(0);
  useEffect(() => {
    localStorage.setItem('cityCode', cityCode);
  },[cityCode]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body setCityCode = {setCityCode} cityCode = {cityCode} setNav = {setNav} nav = {nav}/>} />
        <Route path="/hotel/:id" element={<HotelDetails setNav={setNav}/>} />
      </Routes>
    </BrowserRouter>
  );
}