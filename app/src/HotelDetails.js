import react from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHotelDetails } from './AmadeusAPI.js';

export default function HomeDetails(){
    const { id } = useParams();
    const { data: hotel, isLoading, isError } = useQuery({
            queryKey: ['hotel', id],
            queryFn: () => getHotelDetails(id),
            enabled: !!id,
    });
    return(
        <div>
            {
                hotel && <h1>{hotel[0].hotel.name}</h1>
            }
            {
                hotel && hotel[0].offers[0] && (
                <ul>
                    {
                        hotel[0].offers.map(e =>{
                            return(
                                <li key={id}>{e.room.typeEstimated.bedType}</li>
                        );
                        })
                    }
                </ul>
                )
            }
        </div>
    );
}