import './Header.css'
import { FaUserTie } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import React, { useEffect, useRef, useState } from 'react';


let Header: React.FC = () => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    let currentUser = JSON.parse(localStorage.getItem('user') as string)
    let logOut=()=>{
        localStorage.removeItem("user")
        navigate("/login")
      }

    const navRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div className='Header'>
            <div className='menu-burger' onClick={()=> setMenu(!menu)}>
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
            <div className='Header-down'></div>
            <nav ref={navRef} className={menu ? 'menu-open' : ''}>
                 <ul>
                    <li className='menu-logo'><img src='/img/logo.png'></img></li>
                    <li><NavLink to="/" className={(navData)=>(navData.isActive ? "active" : "")}>People</NavLink></li>
                    <li><NavLink to="/planets" className={(navData)=>(navData.isActive ? "active" : "")}>Planets</NavLink></li>
                    <li><NavLink to="/starship" className={(navData)=>(navData.isActive ? "active" : "")}>Starships</NavLink></li>
                 </ul>
            </nav>
        </div>
    )
}
export default Header;