import Top from './Top.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css';

function Body({setNav,cityCode,setCityCode}){
    const [d1, setD1] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/api/hotels/${cityCode}`)
            .then(res => res.json())    //rs object is promise . bcoz /api/hotels is an async function
            .then( data => setD1(data))
            .catch(err => console.error('Error fetching hotels:', err));
    }, [cityCode]);

    const navigate = useNavigate();
    
    const HandleClick = (hotelId) => {
        navigate(`/hotel/${hotelId}`); // ✅ Navigate to hotel details page
    };
    
    var check = false ;
    function butt(){
        console.log(ans);
        if(ans !== undefined){  //if not used this function then upon no change of input , then ans becomes empty upon researching
            setCityCode(cityCode=>ans);
            // handleSearch() ;
        }
    }
    var ans ;
    return(
        <div>
            <Top setNav={setNav}/>
            <div id='Body-search'>
                <input type="text" placeholder='State' onChange={(e)=>{ans=e.target.value}}></input>
                <input type="date" placeholder='Check-in'></input>
                <input type="date" placeholder='Check-out'></input>
                <input type="number" placeholder='Number of rooms'></input>
                <button onClick={()=>{butt()}}>Search</button>
            </div>
            {
                d1 && d1.results && (
                    <ul id='Body-ul'>
                    {d1.results.map((hotel) => (
                        <li key={hotel.place_id} >
                            <div id='Body-container' onClick={()=> HandleClick(hotel.place_id)}>
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
        </div>
    );
}
export default Body ;