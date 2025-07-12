import {useState , useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import './SignUpPage.css';

export default function SignUpPage({setNav}){
    const [mail,setMail] = useState('') ;
    const [pass,setPass] = useState('') ;
    const [flag,setFlag] = useState(false);
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');

    const location = useLocation() ;
    const navigate = useNavigate() ;
    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/' ;

    useEffect(() => {
        fetch('http://localhost:5000/auth/signup',{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                email: mail ,
                password: pass
            }),
            credentials: 'include'
        })
        .then(res =>res.json())
        .then(res => {
            if(!mail && !pass) return ; // If email or password is empty, do not proceed with the request
            else if(res && res.message === 'User created successfully'){
                alert("Account created successfully");
                navigate(redirectPath);
                //Navigate to login page
            }else alert('Error creating account: ' + res.message);
        })
        .catch(err => console.error('Error creating account:', err));
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
    function handleSignUp(){
        if(isValidEmail(mail) && isValidPassword(pass)) setFlag(e => !e);
    }
    return(
        <div>
            <h1>Sign Up</h1>
            <div>
                <div id='signpage-form'>
                    <div id='signpage-email'>
                        <input type="text" placeholder='Email' onChange={(e)=>{setMail(mail => e.target.value);isValidEmail(mail);}} required/> <br/>
                        <label>{mailError}</label> <br/>
                    </div>
                    <div id='signpage-password'>
                        <input type="password" placeholder='Password' onChange={(e)=>{setPass(pass => e.target.value);isValidPassword(pass);}} required/> <br/>
                        <label>{passError}</label> <br/>
                    </div>
                    <button onClick={()=>handleSignUp()}>Signup</button> <br/>
                </div>
                <div id='signpage-google'>
                    <button className="google-signup-btn">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"
                            height="20px"
                            width="20px"
                            alt="Google"
                        />
                        <span>Sign up with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}