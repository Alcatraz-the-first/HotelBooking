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
                <div className="popup-overlay">
                    <div className="popup">
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        style={{
                        width: window.innerWidth < 768 ? '95vw' : '560px',
                        height: window.innerWidth < 768 ? '50vh' : '315px',
                        maxWidth: window.innerWidth < 768 ? '350px' : 'none'
                        }}
                        allow="autoplay; encrypted-media" 
                        allowFullScreen
                    ></iframe>
                    <button onClick={() => {setShowPopup(false); navigate('/');}}>
                        Close
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}