import { useState , useEffect , useRef} from 'react' ;
import {useNavigate} from 'react-router-dom' ;
import './Top.css';

function Top({isLoggedIn,setIsLoggedIn,redirectPath,setIsProfileUpdated}){
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const searchWrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event){
            if(searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)){
                setIsClicked(e => false); // Close the profile list when clicking outside
                //Close the profile list when clicking outside
            }
        }
        document.addEventListener('mousedown',handleClickOutside);
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[]);
    
    function handleLogin(){
        navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`); // Redirect to the login page including the redirect path
    }
    function handleLogout(){
        if(isLoggedIn){
            fetch('http://localhost:5000/auth/logout',{credentials: 'include'}) // Include credentials to send cookies
                .then(res => res.json())
                .then(res => {
                    if(res && res.message ==='Logout successful'){
                        console.log('isLoggedIn:', isLoggedIn);
                        setIsLoggedIn(e => false);
                        setIsProfileUpdated(e => false);
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
                {isLoggedIn ? (
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <i
                            className="fa-solid fa-user top-user-icon"
                            onClick={() => setIsClicked(e => !e)}
                            ref={searchWrapperRef}
                            style={{
                                color: isClicked ? "#1976d2" : undefined,
                                transition: "color 0.18s"
                            }}
                        ></i>
                        {isClicked && (
                            <ul className='profile-list' ref={searchWrapperRef}>
                                <li onClick={()=>{navigate('/')}} className='profile-item'>Home</li>
                                <li onClick={()=>{navigate('/profile')}} className='profile-item'>Profile</li>
                                <li onClick={()=>{navigate('/bookings')}} className='profile-item'>Bookings</li>
                                <li onClick={()=>{handleLogout()}} className='profile-item'>Logout</li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <button onClick={() => handleLogin()}>Login</button>
                )}
            </div>
        </div>
    );
}
export default Top;