import react from 'react' ;
import Top from './Top.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHotelsByCity } from './AmadeusAPI';
import { useNavigate } from 'react-router-dom';
import './Body.css';

function Body({setNav1,cityCode,setCityCode}){
    const [d1, setD1] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/api/hotels/place=${cityCode}`) //Changed from hotels/place=${cityCode}
            .then(res => res.json())    //rs object is promise . bcoz /api/hotels is an async function
            .then( data => setD1(data))
            .catch(err => console.error('Error fetching hotels:', err));
    }, [cityCode]);

    const navigate = useNavigate();
    
    // const { data: hotels, isLoading, isError, } = useQuery({
    //     queryKey: ['hotels', cityCode],
    //     queryFn: () => getHotelsByCity(cityCode),
    //     enabled: !!cityCode, // Only fetch when cityCode is not empty
    // });
    
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
            {console.log(d1)} 
            <Top setNav1={setNav1}/>
            <input type="text" placeholder='State' onChange={(e)=>{ans=e.target.value}}></input>
            <input type="date" placeholder='Check-in'></input>
            <input type="date" placeholder='Check-out'></input>
            <input type="number" placeholder='Number of rooms'></input>
            <button onClick={()=>{butt()}}>Search</button>
            {/* {
                d1 && d1.results && (
                    <ul>
                    {d1.results.map((hotel) => (
                        <li>
                            <div>{hotel.name}</div>
                        </li>
                    ))}
                    </ul>
                )
            } */}
            {
                d1 && d1.results && (
                    <ul>
                    {d1.results.map((hotel) => (
                        <li key={hotel.place_id} onClick={()=> HandleClick(hotel.place_id)}>
                            <div id='container'>
                                <div id='img'>
                                    {
                                        hotel.photos && hotel.photos.length > 0 ? (
                                        <img
                                            src={`http://localhost:5000/api/images/${hotel.photos[0].photo_reference}`}
                                            alt={hotel.name}
                                            style={{ width: '250px', height: 'auto', borderRadius: '10px' }}
                                        />
                                        ) : (
                                        <p>No image available</p>
                                        )
                                    }
                                </div>
                                <div id='info'>
                                    <h1>{hotel.name}</h1>
                                    <h2>{hotel.formatted_address}</h2>
                                    <p><b>Amenities :</b>{hotel.types.join(', ')}</p>
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