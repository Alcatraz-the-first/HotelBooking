import React from 'react' ;
import './Top.css';
import NavButton from './NavButton.js';

function Top({setNav1}){
    var var1 = 0 ;
    return(
        <div className="sp1">
            <b>Lads</b>
            <div className="login">
                English &nbsp;&nbsp;&nbsp;
                <NavButton setNav1={setNav1} var1={1} buttonName={"Login"}/>
            </div>
        </div>
    );
}
export default Top;