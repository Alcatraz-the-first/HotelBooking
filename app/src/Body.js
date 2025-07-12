import Top from './Top.js';
import Footer from './Footer.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './Body.css';

function Body({isLoggedIn,setIsLoggedIn}){
    const navigate = useNavigate();
    const location = useLocation();
    
    const [d1, setD1] = useState("");
    const [flag, setFlag] = useState(false);
    const [cityCode, setCityCode] = useState(() => sessionStorage.getItem('cityCode') || '');
    const [checkIn,setCheckIn] = useState(() => sessionStorage.getItem('checkIn') || '');
    const [checkOut,setCheckOut] = useState(() => sessionStorage.getItem('checkOut') || '');
    const [numberOfRooms, setNumberOfRooms] = useState(() => sessionStorage.getItem('numberOfRooms') || '');

    const today = new Date().toISOString().split('T')[0];
    const redirectPath = location.pathname + location.search;
    
    useEffect(() => {
        sessionStorage.setItem('cityCode', cityCode);
    },[cityCode]);
    useEffect(() => {
        sessionStorage.setItem('checkIn', checkIn);
    },[checkIn]);
    useEffect(() => {
        sessionStorage.setItem('checkOut', checkOut);
    },[checkOut]);
    useEffect(() => {
        sessionStorage.setItem('numberOfRooms', numberOfRooms);
    },[numberOfRooms]);

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
                }
            })
            .catch(err => {console.error('Error checking authentication:', err);setIsLoggedIn(e=>false);});
    },[]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/hotels/${cityCode}`)
            .then(res => res.json())    //rs object is promise . bcoz /api/hotels is an async function
            .then( data => setD1(data))
            .catch(err => console.error('Error fetching hotels:', err));
    }, [flag]);
    
    const HandleClick = (hotelId) => {
        navigate(`/hotel/${hotelId}`); // ✅ Navigate to hotel details page
    };
    function butt(){
        console.log(cityCode);
        if(cityCode !== undefined || cityCode !== null || cityCode !== '') setFlag(e => !e);
    }

    return(
        <div>
            <Top isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} redirectPath={redirectPath} />
            <div id='Body-search'>
                <input type="text" placeholder='Destination' onChange={(e)=>{setCityCode(cityCode=>e.target.value)}} value={cityCode}></input>
                <input type="date" placeholder='Check-in' min={today} value={checkIn} onChange={(e)=> {setCheckIn(checkIn => e.target.value)}}></input>
                <input type="date" placeholder='Check-out' min={checkIn || today} value={checkOut} onChange={(e)=> {setCheckOut(checkOut => e.target.value)}}></input>
                <select value={numberOfRooms} onChange={e => setNumberOfRooms(e.target.value)} style={{ marginLeft: "10px" }}>
                    <option value="">Number of rooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={()=>{butt()}}>Search</button>
            </div>
            {
                d1 && d1.results && (
                    <ul id='Body-ul'>
                    {d1.results.map((hotel) => (
                        <li key={hotel.place_id} >
                            <div id='Body-container' onClick={()=> {if (window.getSelection().toString()){return;} HandleClick(hotel.place_id);}}>
                                <div id='Body-img'>
                                    {
                                        hotel.photos && hotel.photos.length > 0 ? (
                                        <img
                                            src={`http://localhost:5000/api/images/${hotel.photos[0].photo_reference}`}
                                            alt={hotel.name}
                                            style={{ width: '250px', height: 'auto', borderRadius: '10px' }}
                                        />
                                        ) : (
                                            <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                                            alt={hotel.name}
                                            style={{ width: '250px', height: 'auto', borderRadius: '10px' }}
                                            />
                                        )
                                    }
                                </div>
                                <div id='Body-info'>
                                    <h1>{hotel.name}</h1>
                                    <h2>{hotel.formatted_address}</h2>
                                    <p>Rating : {hotel.rating}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                )
            }
            {
                (!d1 || !d1.results || d1.results.length === 0) && (
                    <div style={{height: '35vh'}}></div>
                )
            }
            <Footer />
        </div>
    );
}
export default Body ;