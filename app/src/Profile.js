import {useState , useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom' ;
import Top from './Top.js';
import Footer from './Footer.js';
import './Profile.css';

export default function Profile({isLoggedIn, setIsLoggedIn , setIsProfileUpdated}) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('Not Set');
    const [lastName, setLastName] = useState('Not Set');
    const [editor,setEditor]=useState('false');

    useEffect(() => {
            fetch('http://localhost:5000/auth/check',{credentials: 'include'}) // Include credentials to send cookies
                .then(res => res.json())
                .then(res => {
                    if(res && res.authenticated){
                        console.log("User is authenticated with ID:", res.userId);
                        setIsLoggedIn(e=>true) ;
                    }else{
                        console.log("User is not authenticated");
                        setIsLoggedIn(e=>false) ;
                        navigate('/login');
                    }
                })
                .catch(err => {console.error('Error checking authentication:', err);setIsLoggedIn(e=>false);navigate('/login')});
    },[]);
    useEffect(() => {
        fetch('http://localhost:5000/profile',{credentials: 'include'}) // Include credentials to send cookies
            .then(res => res.json())
            .then(res => {
                if(res && res.user){
                    setFirstName(res.user.firstname || '');
                    setLastName(res.user.lastname || '');
                }else console.log("No user data found");
            })
            .catch(err => console.error('Error fetching user data:', err));
    },[]);

    function handleSave(){
        fetch('http://localhost:5000/profile/update' , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                firstname: firstName.trim(),
                lastname: lastName.trim()
            }),
            credentials: 'include' // Include credentials to send cookies
        })
            .then(res => res.json())
            .then(res => {
                if(res && res.message === 'User updated successfully'){
                    alert("Profile updated successfully");
                    if(firstName && lastName) {
                        setIsProfileUpdated(e => true);
                    }else console.log("Profile not updated completely");
                }else{
                    console.log("Error updating profile:", res.message);
                }
            })
            .catch(err => console.error('Error updating profile:', err));
    }
    return(
        <div>
            <Top isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} redirectPath={''} setIsProfileUpdated={setIsProfileUpdated}/>
            <div className='prfile-container'>
                <h1>Profile Page</h1>
                <div className='profile-save'>
                    {editor === "false" ? (
                        <span>First Name: {firstName}</span>
                    ) : (
                        <label>
                        Enter First Name :
                        <input
                            type="text"
                            className="profile-input"
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        </label>
                    )}
                    </div>

                    <div className='profile-save'>
                    {editor === "false" ? (
                        <span>Last Name: {lastName}</span>
                    ) : (
                        <label>
                        Enter Last Name:
                        <input
                            type="text"
                            className="profile-input"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        </label>
                    )}
                    </div>
                {editor==="false" && <button onClick={()=>setEditor(e=>"true")}>Update Profile</button>}
                {editor==="true" && <button id='profile-save' onClick={() => {if(firstName || lastName){handleSave();setEditor(()=>"false")}}}>Save Changes</button>}
            </div>
            <Footer />
        </div>
    )
}
