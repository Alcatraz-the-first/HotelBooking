import react from 'react';
import NavButton from './NavButton.js' ;

function SignUp({setNav}){
    return(
        <div>
            Sign Up
            <div>
                Full Name : <input type="text" placeholder='Enter your full name'></input>
                <br/>
                Email ID : <input type="email" placeholder="Enter your email"></input>
                <br/>
                Password : <input type="password"></input>
                <button>Sign Up</button>
            </div>
            <div>
                Sign up with :
                <button>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png" height="20px" width="20px"></img>
                </button>
            </div>
            <div>
                <NavButton setNav={setNav} var1={0} buttonName={"Home"}/>
            </div>
        </div>
    );
}export default SignUp ;