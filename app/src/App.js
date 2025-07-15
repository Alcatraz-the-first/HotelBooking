import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Body.js';
import HotelDetails from './HotelDetails.js';
import LoginPage from './LoginPage.js';
import SignUpPage from './SignUpPage.js';
import PaymentPage from './PaymentPage.js';
import Profile from './Profile.js';
import BookingDetails from './BookingDetails.js';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/hotel/:id" element={<HotelDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isProfileUpdated={isProfileUpdated} setIsProfileUpdated={setIsProfileUpdated} />} />
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} /> } />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/payment/:id' element={<PaymentPage />} />
        <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsProfileUpdated={setIsProfileUpdated} />} />
        <Route path='/bookings' element={<BookingDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}
