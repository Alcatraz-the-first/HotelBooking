import { useState , useEffect} from 'react' ;
import {useNavigate} from 'react-router-dom' ;
import './Top.css';

function Top({isLoggedIn,setIsLoggedIn,redirectPath}){
    const navigate = useNavigate();
    
    function handleLogin(){
        navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`); // Redirect to the login page including the redirect path
    }
    function handleLogout(){
        if(isLoggedIn){
            fetch('http://localhost:5000/api/logout',{credentials: 'include'}) // Include credentials to send cookies
                .then(res => res.json())
                .then(res => {
                    if(res && res.message ==='Logout successful'){
                        console.log('isLoggedIn:', isLoggedIn);
                        setIsLoggedIn(e => false);
                        console.log('isLoggedIn:', isLoggedIn);
                        alert("Logged out successfully");
                    }else console.log(res.message);
                })
                .catch(err => console.error('Error logging out:', err));
        }
    }

    return(
        <div className="Top-sp1">
            <img src="/LADSlogo2.png" alt="Logo" className="Top-logo" onClick={()=>{navigate(`/`)}}/>
            <div className="Top-login">
                <span>English</span>
                {
                    !isLoggedIn && <button onClick={()=>{handleLogin()}}>Login</button>
                }
                {
                    isLoggedIn && <button onClick={()=>{handleLogout()}}>Logout</button>
                }
            </div>
        </div>
    );
}
export default Top;