import {useState , useEffect} from 'react';
import NavButton from './NavButton.js' ;

function SignUp({setNav}){
    const [mail,setMail] = useState('') ;
    const [pass,setPass] = useState('') ;
    const [flag,setFlag] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/api/signup',{
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
            if(res && res.message === 'User created successfully'){
                alert("Account created successfully");
                //Navigate to login page
            }else alert('Error creating account: ' + res.message);
        })
        .catch(err => console.error('Error creating account:', err));
    },[flag]);
    function createAccount(){
        setFlag(e => !e);
    }
    return(
        <div>
            Sign Up
            <div>
                Email ID : <input type="email" placeholder="Enter your email" onChange={(e)=>{setMail(mail => e.target.value)}} />
                <br/>
                Password : <input type="password" onChange={(e)=>{setPass(pass => e.target.value)}} />
                <br/>
                <button onClick={() => createAccount()}>Sign Up</button>
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