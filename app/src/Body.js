import Top from './Top.js';
import Footer from './Footer.js';
import { useState , useEffect , useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './Body.css';

function Body({isLoggedIn,setIsLoggedIn}){
    const navigate = useNavigate();
    const location = useLocation();
    
    const [d1, setD1] = useState("");
    const [cityCode, setCityCode] = useState(() => sessionStorage.getItem('cityCode') || '');
    const [checkIn,setCheckIn] = useState(() => sessionStorage.getItem('checkIn') || '');
    const [checkOut,setCheckOut] = useState(() => sessionStorage.getItem('checkOut') || '');
    const [numberOfRooms, setNumberOfRooms] = useState(() => sessionStorage.getItem('numberOfRooms') || '');
    const [suggestions, setSuggestions] = useState([]);
    const [place, setPlace] = useState(sessionStorage.getItem('cityCode') || '');
    const searchWrapperRef = useRef(null);

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
        function handleClickOutside(event){
            if(searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)){
                setSuggestions([]); // Clear suggestions when clicking outside
            }
        }
        document.addEventListener('mousedown',handleClickOutside);
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[]);

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
    }, [cityCode]);
    
    const HandleClick = (hotelId) => {
        navigate(`/hotel/${hotelId}`); // ✅ Navigate to hotel details page
    };
    function butt(){
        console.log(cityCode);
        if(cityCode !== undefined || cityCode !== null || cityCode !== '') setCityCode(cityCode => place);
    }

    function handleSuggestion(text){
        fetch(`http://localhost:5000/api/autocomplete/${text}`)
            .then(res => res.json())
            .then(res => {
                if(res && res.predictions && res.predictions.map(e => e.structured_formatting.main_text)){
                    setSuggestions(res.predictions.map(e => e.structured_formatting.main_text));
                }else setSuggestions([]);
            })
            .catch(err => console.error('Error fetching suggestions:', err));
    }

    return(
        <div>
            <Top isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} redirectPath={redirectPath} />
            <div id='Body-search'>
                <div className="search-input-wrapper" ref={searchWrapperRef}>
                    <input type="text" placeholder="Destination" onChange={(e) => {setPlace(place => e.target.value); handleSuggestion(place);}} value={place}/>
                    {suggestions && suggestions.length > 0 && (
                    <ul className="suggestion-list">
                        {suggestions.map((suggestion, idx) => (
                        <li key={idx} onClick={() => {setPlace(place => suggestion);setSuggestions([]);}} className="suggestion-item">
                            {suggestion}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                <input type="date" placeholder='Check-in' min={today} value={checkIn} onChange={(e)=> {setCheckIn(checkIn => e.target.value)}}></input>
                <input type="date" placeholder='Check-out' min={checkIn || today} value={checkOut} onChange={(e)=> {setCheckOut(checkOut => e.target.value)}}></input>
                <select value={numberOfRooms} onChange={(e) => {setNumberOfRooms(e.target.value)}} style={{ marginLeft: "10px" }}>
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