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
        fetch(`http://localhost:5000/booking/rooms`, {
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
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "24px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                            maxWidth: "90vw",
                            maxHeight: "80vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/hvL1339luv0?autoplay=1&si=cP6EZfqKw0WLKSQv"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        ></iframe>
                        <button
                            style={{
                                marginTop: "18px",
                                padding: "10px 24px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#1976d2",
                                color: "#fff",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                            onClick={() => {setShowPopup(false); navigate('/');}}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}