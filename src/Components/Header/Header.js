import './Header.css'
import { FaUserTie } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";


let Header = () => {
    const navigate = useNavigate()
    let currentUser = JSON.parse(localStorage.getItem('user'))
    let logOut=()=>{
        localStorage.removeItem("user")
        navigate("/login")
      }
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
                    {
                        currentUser!=null ?
                        (<button onClick={logOut}><MdLogout /> <p>Log Out</p></button>) 
                        : 
                        (<button onClick={()=>{navigate("/login")}}><FaUserTie /><p>Log In</p></button>)
                    }
                 </div>
            </div>
            <div className='Header-down'>
                 <ul>
                    <li><NavLink to="/" className={(navData)=>(navData.isActive ? "active" : "")}>People</NavLink></li>
                    <li><NavLink to="/planets" className={(navData)=>(navData.isActive ? "active" : "")}>Planets</NavLink></li>
                    <li><NavLink to="/starship" className={(navData)=>(navData.isActive ? "active" : "")}>Starships</NavLink></li>
                 </ul>
            </div>
        </div>
    )
}
export default Header;