import { useParams } from 'react-router-dom';
import {useEffect , useState} from 'react' ;
import { useNavigate, useLocation } from 'react-router-dom';
import ImageWindows from './ImageW.js';
import './HotelDetails.css';
import Top from './Top.js';
import Footer from './Footer.js';

export default function HotelDetails({isLoggedIn,setIsLoggedIn}) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { id } = useParams();
    const [hotel , setHotel] = useState("");
    const [checkIn,setCheckIn] = useState(() => sessionStorage.getItem('checkIn') || '');
    const [checkOut,setCheckOut] = useState(() => sessionStorage.getItem('checkOut') || '');
    const [numberOfRooms, setNumberOfRooms] = useState(() => sessionStorage.getItem('numberOfRooms') || '');

    const today = new Date().toISOString().split('T')[0] ;
    const redirectPath = location.pathname + location.search;
    const imageArray = hotel && hotel.result && hotel.result.photos ? hotel.result.photos.map((photo) => photo.photo_reference) : [] ;

    useEffect(() => {
        fetch('http://localhost:5000/auth/check',{credentials: 'include'})
            .then(res => res.json())
            .then(res => {
                if(res && res.authenticated){
                    console.log("User is authenticated with ID:", res.userId);
                    setIsLoggedIn(e => true);
                }else{
                    console.log("User is not authenticated");
                    setIsLoggedIn(e => false);
                }
            })
            .catch(err => {console.error('Error checking authentication:', err);setIsLoggedIn(e => false);});
    },[]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/details/${id}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(err => console.error('Error fetching hotel details:', err));
    },[]);
    
    function handlePayment(){
        navigate(`/payment`);
    }

    return(
        <div>
            <Top isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} redirectPath={redirectPath} />
            {
                hotel && hotel.result && (
                    <>
                        <div id='HotelDetail-Top'>
                            <div id='HotelDetails-image'>
                                {
                                    hotel.result.photos && hotel.result.photos.length > 0 ? (
                                        <ImageWindows array={imageArray} />
                                    ) : (
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                                            alt={hotel.result.name}
                                            style={{ width: '250px', height: 'auto', borderRadius: '10px' }}
                                        />
                                    )
                                }
                            </div>
                            <div id='HotelDetails-details'>
                                <h1>{hotel.result.name}</h1>
                                <address>Address : {hotel.result.formatted_address}</address>
                                <p>Phone Number : {hotel.result.formatted_phone_number}</p>
                                <p>Rating : {hotel.result.rating}</p>
                                <a href={hotel.result.url} target='_blank'>Google Map Link</a>
                            </div>
                        </div>
                        <div id='HotelDetails-payment'>
                            <input type="date" placeholder='Check-in' min={today} value={checkIn} onChange={(e)=> {setCheckIn(checkIn => e.target.value)}}></input>
                            <input type="date" placeholder='Check-out' min={checkIn || today} value={checkOut} onChange={(e)=> {setCheckOut(checkOut => e.target.value)}}></input>
                            <select value={numberOfRooms} onChange={e => setNumberOfRooms(e.target.value)} style={{ marginLeft: "10px" }}>
                                <option value="">Number of rooms</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <button onClick={()=>{handlePayment()}}>Pay Now</button>
                        </div>
                        <div id='HotelDetails-review'>
                            <ul>
                                {
                                    hotel.result.reviews && (
                                        hotel.result.reviews.map((rev) => (
                                            <li key={rev.time}>
                                                <div id='HotelDetails-reviewer'>
                                                    <img src={rev.profile_photo_url}/>
                                                    {rev.author_name} , <b>{rev.rating}</b>
                                                </div>
                                                <div id='review'>
                                                    <p>{rev.text}</p>
                                                </div>
                                            </li>
                                        ))
                                    )
                                }
                            </ul>
                        </div>
                    </>
                )
            }
            <Footer />
        </div>
    );
}