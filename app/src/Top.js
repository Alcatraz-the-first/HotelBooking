import React from 'react' ;
import './Top.css';
import NavButton from './NavButton.js';

function Top({setNav}){
    var var1 = 0 ;
    return(
        <div className="Top-sp1">
            <img src="/LADSlogo2.png" alt="Logo" className="Top-logo" />
            <div className="Top-login">
                <span>English</span>
                <NavButton setNav={setNav} var1={1} buttonName={"Login"}/>
            </div>
        </div>
    );
}
export default Top;