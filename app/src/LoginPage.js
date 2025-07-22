import {useState,useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage({isProfileUpdated,setIsProfileUpdated}){
    const [pass, setPass] = useState('');
    const [mail, setMail] = useState('');
    const [flag,setFlag] = useState(false);
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');

    const location = useLocation() ;
    const navigate = useNavigate() ;
    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/' ;

    useEffect(() => {
        fetch('http://localhost:5000/auth/login',{
            method: 'POST' ,
            headers: {
                'Content-Type': 'Application/json',
            },
            body:JSON.stringify({
                email: mail,
                password: pass
            }),
            credentials: 'include' // Include credentials to send cookies
        })
        .then(res => res.json())
        .then(res => {
            if(!mail && !pass) return ; // If email or password is empty, do not proceed with the request
            else if(res && res.message === 'Login successful'){
                console.log('Successfully logged in');
                console.log(res.isProfileUpdated);
                if(res.isProfileUpdated===true) setIsProfileUpdated(e=>true);
                // Log the success message
                // console.log('IsloggedIn:', isLoggedIn); // Log the isLoggedIn status
                navigate(redirectPath); // Navigate to the redirect path after successful login
            }else alert(res.message);
        })
        .catch(err => console.error('Error fetching login data:', err));
    },[flag]);

    function isValidEmail(x){
        if(x){
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const check = re.test(String(x).toLowerCase());
            if(!check){
                setMailError(e => e = 'Please enter a valid email address');
                return false ;
            }else{
                setMailError(e => e = '');
                return true ;
            }
        }
    }
    function isValidPassword(x){
        if(x){
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Updated regex to include at least one uppercase letter, one lowercase letter, one number, and one special character
            const check = re.test(x);
            if(!check){
                setPassError(e =>e = 'Password must be atleast 8 characters long, contain at least one uppercase letter , one lower case letter , one special character and one number');
                return false ;
            }else{
                setPassError(e => e = '');
                return true ;
            }
        }
    }
    function handleLogIn(){
        if(isValidEmail(mail) && isValidPassword(pass)) setFlag(e => !e);
    }
    function handleSignUp(){
        navigate(`/signup?redirect=${encodeURIComponent(redirectPath)}`); // Redirect to the signup page including the redirect path
    }

   return (
  <div className="login-page-container">
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h1>
      <div id='loginpage-form'>
        <div id='loginpage-email'>
          <input type="text" placeholder='Registered Email' onChange={(e)=>{setMail(mail => e.target.value); isValidEmail(mail);}} required/>
          <label>{mailError}</label>
        </div>
        <div id='loginpage-password'>
          <input type="password" placeholder='Password' onChange={(e)=>{setPass(pass => e.target.value); isValidPassword(pass);}} required/>
          <label>{passError}</label>
        </div>
        <button onClick={handleLogIn}>Login</button>
      </div>

      <div id='loginpage-google'>
        <button className="google-login-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png" height="20px" width="20px" alt="Google" />
          <span>Login with Google</span>
        </button>
      </div>

      <div id='loginpage-signup'>
        <p>Don't have an account?</p>
        <span id='loginpage-signupbut' onClick={handleSignUp}>Sign Up</span>
      </div>
    </div>
  </div>
);


}