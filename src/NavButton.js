import react from 'react' ;
import './NavButton.css';

function NavButton({setNav1,var1,buttonName}){
    function fun(){
        setNav1(nav1=>var1);
    }
    return(
        <button className="nav-button" onClick={()=>fun()}>{buttonName}</button>
    );
}
export default NavButton ;