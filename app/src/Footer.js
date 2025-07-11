import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer(){
    const navigate = useNavigate();
    return(
        <div id='footer'>
            <div id='footer-col1'>
                <h4>USEFUL LINKS</h4>
                <ul>    
                    <li onClick={()=>{navigate(`/`)}}>About</li>
                    <li onClick={()=>{navigate('/')}}>Home</li>
                    <li>Our Other Works</li>
                </ul>
            </div>
            <div id='footer-col2'>
                <h4>NEWSLETTER</h4>
                <input type='email' placeholder='Your Email Address' />
                <button>Subscribe Now</button>
            </div>
            <div id='footer-col3'>
                <h4>CONTACT</h4>
                <span>lekharshavsengupta2002@gmail.com</span>
                <span>grandmastergogo13@gmail.com</span>
                <div id='social-media'>
                    <span>Follow us on</span>
                    <div className='social-icons'>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-github"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}