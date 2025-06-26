import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './App.js';
import HotelDetails from './HotelDetails.js';
import { useState } from 'react';

export default function App() {
  const [cityCode, setCityCode] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body setCityCode = {setCityCode} cityCode = {cityCode}/>} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </BrowserRouter>
  );
}