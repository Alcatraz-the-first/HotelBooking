import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
                        <a href="https://www.facebook.com/lekharshav.sengupta/" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/nihilistic__goose/" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://x.com/Krustypats" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://github.com/AdityaChowdhury15" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}