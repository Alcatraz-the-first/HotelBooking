import react from 'react' ;
import './NavButton.css';
import { useNavigate } from 'react-router-dom';

function NavButton({setNav,var1,buttonName}){
    const navigate = useNavigate();

    function fun(){
        navigate(`/`);
        setNav(nav1=>var1);
    }
    return(
        <button className="nav-button" onClick={()=>fun()}>{buttonName}</button>
    );
}
export default NavButton ;