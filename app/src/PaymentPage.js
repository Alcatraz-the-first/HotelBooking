import { useState } from "react";
import { useParams , useNavigate} from 'react-router-dom';
import './PaymentPage.css';

export default function PaymentPage() {
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const { id } = useParams();
    const price = Number(localStorage.getItem(`price${id}`)) || 0;
    const rooms = Number(localStorage.getItem(`rooms${id}`)) || 0;
    const checkIn = new Date(sessionStorage.getItem('checkIn')) || '';
    const checkOut = new Date(sessionStorage.getItem('checkOut')) || '';
    const numberOfRooms = Number(sessionStorage.getItem('numberOfRooms')) || 0 ;
    const totalPrice = price * numberOfRooms ;

    function reduceRooms(){
        if (rooms > 0) {
            localStorage.setItem(`rooms${id}`, rooms - numberOfRooms);
            console.log(`Rooms left: ${rooms - numberOfRooms}`);
        }else{
            console.log("No rooms left to reduce.");
        }
    }
    function handlePayment(){
        fetch(`https://lads-yjao.onrender.com/booking/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hotelId: id,
                numberOfRooms: numberOfRooms,
                ratePerNight: price,
                totalPrice: totalPrice,
                checkInDate: new Date(checkIn),
                checkOutDate: new Date(checkOut)
            }),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if(res && res.message === 'Booking successful') {
                    console.log("Booking successful");
                    reduceRooms();
                    alert("Booking successful! Redirecting to home page.");
                    setShowPopup(true);
                }
            })
    }

    return (
        <div>
            <div id="bill">
                <h2>Booking Summary</h2>
                <div className="bill-row">
                    <span>Rooms Chosen:</span>
                    <span>{numberOfRooms}</span>
                </div>
                <div className="bill-row">
                    <span>Price per Room:</span>
                    <span>₹{price}</span>
                </div>
                <div className="bill-row total">
                    <span>Total Price:</span>
                    <span>₹{numberOfRooms * price}</span>
                </div>
            </div>
            <div id='payment'>
                <button onClick={() => {handlePayment()}}>Pay Now</button>
            </div>
            {showPopup && (
                <div className="popup-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}>
                    <div className="popup" style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <iframe 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            style={{
                                width: window.innerWidth < 768 ? '95vw' : '560px',
                                height: window.innerWidth < 768 ? '50vh' : '315px',
                                maxWidth: window.innerWidth < 768 ? '320px' : '560px',
                                border: 'none',
                                borderRadius: '8px'
                            }}
                            allow="autoplay; encrypted-media" 
                            allowFullScreen
                        ></iframe>
                        <br /><br />
                        <button 
                            onClick={() => {setShowPopup(false); navigate('/');}} 
                            style={{
                                background: '#1976d2',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Close & Go Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}