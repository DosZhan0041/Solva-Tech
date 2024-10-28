import './Header.css'
import { FaUserTie } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';


let Header = () => {
    return(
        <div className='Header'>
            <div className='menu-burger'>
                {<GiHamburgerMenu />}
            </div>
            <div className='Header-up'>
                 <div className='Header-up-left'>
                      <img src='/img/logo.png'/>
                 </div>
                 <div className='Header-up-right'>
                    <button><FaUserTie /><p>Log In</p></button>
                 </div>
            </div>
            <div className='Header-down'>
                 <ul>
                    <li><NavLink to="/" className={(navData)=>(navData.isActive ? "active" : "")}>People</NavLink></li>
                    <li><NavLink to="/planets" className={(navData)=>(navData.isActive ? "active" : "")}>Planets</NavLink></li>
                    <li><NavLink to="/starships" className={(navData)=>(navData.isActive ? "active" : "")}>Starships</NavLink></li>
                 </ul>
            </div>
        </div>
    )
}
export default Header;