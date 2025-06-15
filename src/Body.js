import react from 'react' ;
import Top from './Top.js';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHotelsByCity } from './AmadeusAPI';

function Body({setNav1}){
    const [cityCode, setCityCode] = useState();

    const { data: hotels, isLoading, isError, refetch } = useQuery({
        queryKey: ['hotels', cityCode],
        queryFn: () => getHotelsByCity(cityCode),
        enabled: !!cityCode, // Only fetch when cityCode is not empty
    });

    const handleSearch = () => {
        refetch(); // manually trigger if needed
    };
    
    var check = false ;
    function butt(){
        console.log(ans);
        if(ans !== undefined){
            setCityCode(cityCode=>ans);
            handleSearch() ;
        }
    }
    var ans ;
    return(
        <div>
            <Top setNav1={setNav1}/>
            <input type="text" placeholder='State' onChange={(e)=>{ans=e.target.value}}></input>
            <input type="date" placeholder='Check-in'></input>
            <input type="date" placeholder='Check-out'></input>
            <input type="number" placeholder='Number of rooms'></input>
            <button onClick={()=>{butt()}}>Search</button>
            {
                hotels && (
                    <ul>
                    {hotels.map((hotel) => (
                        <li key={hotel.hotelId}>
                        <strong>{hotel.name}</strong> — ID: {hotel.hotelId}
                        </li>
                    ))}
                    </ul>
                )
            }
        </div>
    );
}
export default Body ;