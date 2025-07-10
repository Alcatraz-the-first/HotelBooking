import {useEffect, useState} from 'react' ;
import NavButton from './NavButton';


function Login({setNav}){
    const [pass, setPass] = useState('');
    const [mail, setMail] = useState('');
    const [flag,setFlag] = useState(false);
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const [data, setData] = useState();
    useEffect(() => {
        fetch('http://localhost:5000/api/login',{
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email: mail,
                password: pass
            }),
            credentials: 'include' // Include credentials to send cookies
        })
        .then(res => res.json())
        .then(res => {
            if(res && res.message === 'Login successful'){
                setData(e => res);
            }else alert(res.message);
        })
        .catch(err => console.error('Error fetching login data:', err));
    },[flag]);
    useEffect(() => {
        if(data && data.message === 'Login successful'){
            console.log("Lekharhsav : Ei suorer bacha 2!");
            setNav(e => 0);
        }
    },[data]);
    function isValidEmail(x){
        if(x){
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const check = re.test(String(x).toLowerCase());
            if(!check){
                setMailError(e => e = 'Please enter a valid email address');
            }else{
                setMailError(e => e = '');
            }
        }
    }
    function isValidPassword(x){
        if(x){
            const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;
            const check = re.test(x);
            if(!check){
                setPassError(e =>e = 'Password must be 6-10 characters long, contain at least one uppercase letter and one number');
            }else{
                setPassError(e => e = '');
            }
        }
    }
    function setCredentials(){
        setFlag(e => !e) ;
    }
    return(
        <div>
            <h1>Login</h1>
            <div>
                <div id='login-form'>
                    <div id='login-email'>
                        <input type="text" placeholder='Registered Email' onChange={(e)=>{setMail(mail => e.target.value);isValidEmail(mail);}} required/> <br/>
                        <label>{mailError}</label> <br/>
                    </div>
                    <div id='login-password'>
                        <input type="password" onChange={e=>{setPass(pass => e.target.value);isValidPassword(pass);}} required/> <br/>
                        <label>{passError}</label> <br/>
                    </div>
                    <button onClick={()=>setCredentials()}>Login</button> <br/>
                </div>
                <div>
                    New User ?
                    <NavButton setNav={setNav} var1={2} buttonName={"Sign Up"}/>
                </div>
            </div>
        </div>
    );
}
export default Login ;