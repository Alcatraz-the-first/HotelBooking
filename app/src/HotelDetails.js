import { useParams } from 'react-router-dom';
import {useEffect , useState} from 'react' ;
import ImageWindows from './ImageW.js';
import './HotelDetails.css';
import Top from './Top.js';

export default function HotelDetails({setNav}){
    const { id } = useParams();
    const [hotel , setHotel] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/api/details/${id}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(err => console.error('Error fetching hotel details:', err));
    },[]);
    
    const imageArray = hotel && hotel.result && hotel.result.photos ? hotel.result.photos.map((photo) => photo.photo_reference) : [] ;

    return(
        <div>
            <Top setNav={setNav}/>
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
        </div>
    );
}