import react from 'react' ;
import NavButton from './NavButton';

function Login({setNav1}){
    return(
        <div>
            <h1>Login</h1>
            <div>
                <input type="email" placeholder='Registered Email'></input>
                <input type="password"></input>
                <button onClick={()=>{}}>Login</button>
            </div>
            <div>
                New User ?
                <NavButton setNav1={setNav1} var1={2} buttonName={"Sign Up"}/>
            </div>
        </div>
    );
}
export default Login ;