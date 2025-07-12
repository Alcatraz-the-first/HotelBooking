import {useState,useEffect} from 'react' ;
import './ImageW.css';

export default function ImageW({array}){
    const n = array.length;
    const [pos , setPos] = useState(0) ;
    useEffect(()=>{
         const interval = setInterval(() =>{
            setPos( pos => (pos + 1 + n) % n )
        },5000);
        return () => clearInterval(interval);
    },[pos]);
    return (
        <div id='ImageW-container'>
            <div id='image'>
                <img src={`http://localhost:5000/api/images/${array[pos]}`}/>
            </div>
            <div id='ImageW-lbutton'>
                <button onClick={() => setPos( pos => (pos - 1 + n) % n )}/>
            </div>
            <div id='ImageW-rbutton'>
                <button onClick={() => setPos( pos => (pos + 1 + n) % n )}/>
            </div>
        </div>
    );
}