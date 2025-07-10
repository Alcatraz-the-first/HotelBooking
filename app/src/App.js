import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Body.js';
import HotelDetails from './HotelDetails.js';
import LoginPage from './LoginPage.js';
import SignUpPage from './SignUpPage.js';
import PaymentPage from './PaymentPage.js';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/hotel/:id" element={<HotelDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn}/> }/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}