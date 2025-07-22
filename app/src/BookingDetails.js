import {useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Top from './Top.js';
import Footer from './Footer.js';
import './BookingDetails.css';

export default function BookingDetails({isLoggedIn, setIsLoggedIn, setIsProfileUpdated}){
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            fetch('http://localhost:5000/auth/check',{credentials: 'include'}) // Include credentials to send cookies
                .then(res => res.json())
                .then(res => {
                    if(res && res.authenticated){
                        console.log("User is authenticated with ID:", res.userId);
                        setIsLoggedIn(e=>true) ;
                    }else{
                        console.log("User is not authenticated");
                        setIsLoggedIn(e=>false) ;
                        navigate('/login');
                    }
                })
                .catch(err => {console.error('Error checking authentication:', err);setIsLoggedIn(e=>false);navigate('/login')});
    },[]);
    useEffect(() => {
        fetch('http://localhost:5000/booking',{credentials: 'include'})
            .then(res => res.json())
            .then(res => {
                if(res && res.length > 0){
                    setData(res);
                }else{
                    console.log("No bookings found or error fetching bookings");
                }
            })
            .catch(err => console.error('Error fetching bookings:', err));
    });
    return(
        <div>
            <Top isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} redirectPath={''} setIsProfileUpdated={setIsProfileUpdated} />
            <div id='bookings'>
                {(!data || data.length === 0) ? (
                    <div className="no-bookings">
                        No Bookings Yet!
                    </div>
                ) : (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th style={{ width: "60px" }}>S.No.</th>
                                <th>Booking Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((booking, idx) => (
                                <tr key={booking._id || idx}>
                                    <td style={{ textAlign: "center", fontWeight: 500 }}>{idx + 1}</td>
                                    <td>
                                        <div className="booking-details-div"><b>Hotel ID:</b> {booking.hotelId}</div>
                                        <div className="booking-details-div"><b>Check-in:</b> {new Date(booking.checkInDate).toLocaleDateString()}</div>
                                        <div className="booking-details-div"><b>Check-out:</b> {new Date(booking.checkOutDate).toLocaleDateString()}</div>
                                        <div className="booking-details-div"><b>Rooms:</b> {booking.numberOfRooms}</div>
                                        <div className="booking-details-div"><b>Price/Room:</b> ₹{booking.ratePerNight}</div>
                                        <div className="booking-details-div"><b>Total Price:</b> ₹{booking.totalPrice}</div>
                                        <div className="booking-details-div"><b>Booking Date:</b> {booking.bookingDate ? new Date(booking.bookingDate).toLocaleString() : "-"}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    )
};