import react from 'react' ;
import Top from './Top.js';

function Body({setNav1}){
    return(
        <div>
            <Top setNav1={setNav1}/>
            <input type="text" placeholder='State'></input>
            <input type="date" placeholder='Check-in'></input>
            <input type="date" placeholder='Check-out'></input>
            <input type="number" placeholder='Number of rooms'></input>
            <button onclick={()=>{}}>Search</button>
        </div>
    );
}
export default Body ;