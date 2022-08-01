import React from 'react';
import HeaderCSS from '../css/Header.module.css';
import {Link, useLocation} from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import {AiFillContacts, 
        AiOutlineShoppingCart,
        AiFillHome,
        AiFillSchedule,
        AiOutlineLogout,
        AiOutlineMenu
    } from 'react-icons/ai';
import {MdCategory} from 'react-icons/md';


function Header(){
    const [toggle,setToggle] = React.useState(false)
    const location = useLocation();

    const closeDropdown = () => {
        setToggle(false)
    }

    const Dropdown = () => {
        const ref = useDetectClickOutside({ onTriggered: closeDropdown });
        return (
            <div className={HeaderCSS.dropDownContainer} ref={ref}>
                <Link to="/profile" className={HeaderCSS.dropDownButton}>PROFILE</Link>
                <Link to="/myorders" className={HeaderCSS.dropDownButton}>ITEMS</Link>
                <Link to="/" className={HeaderCSS.dropDownButton}
                    onClick={()=>{
                        localStorage.clear();
                    }}
                >LOGOUT</Link>
            </div>
        );
    };

    
    

    return(
        <div className = {HeaderCSS.container}>
            <div className={HeaderCSS.buttonsContainer}>
                <Link className={location.pathname === "/home" ? HeaderCSS.buttonActive : HeaderCSS.button } to='/home'><p>HOME</p></Link>
                <Link className={location.pathname === "/home" ? HeaderCSS.buttonActiveMobile : HeaderCSS.buttonMobile } to='/home'><p><AiFillHome/></p></Link>
                <Link className={location.pathname === "/category"? HeaderCSS.buttonActive : HeaderCSS.button} to='/category'><p>EQUIPMENT</p></Link>
                <Link className={location.pathname === "/category" ? HeaderCSS.buttonActiveMobile : HeaderCSS.buttonMobile } to='/category'><p><MdCategory/></p></Link>
                <Link className={location.pathname === "/reservations" ? HeaderCSS.buttonActive : HeaderCSS.button } to='/reservations'><p>ROOM RESERVATIONS</p></Link>
                <Link className={location.pathname === "/reservations" ? HeaderCSS.buttonActiveMobile : HeaderCSS.buttonMobile } to='/reservations'><p><AiFillSchedule/></p></Link>
                <Link className={location.pathname === "/contactus" ? HeaderCSS.buttonActive : HeaderCSS.button } to='/contactus'><p>CONTACT US</p></Link>
                <Link className={location.pathname === "/contactus" ? HeaderCSS.buttonActiveMobile : HeaderCSS.buttonMobile } to='/contactus'><p><AiFillContacts/></p></Link>
            </div>

            <div className={HeaderCSS.headerTitle}>
                <Link className={HeaderCSS.headerText} to="/home" style={{textDecoration:"none",color:'black'}}>CpE Laboratory Borrowing System</Link>
                <Link className={HeaderCSS.headerTextMobile} to="/home" style={{textDecoration:"none",color:'black'}}>
                    <img src={require('../../assets/images/mglogo.png')}/>
                </Link>
            </div>
            

            <div className = {HeaderCSS.logoContainer}>
                <Link to="/order"><img className={HeaderCSS.logoIcon} src={require('../../assets/icons/shopping-cart-check.png')} alt="Logo" /></Link>
                <Link to="/order" className={location.pathname === "/order" ? HeaderCSS.buttonActiveMobile : HeaderCSS.buttonMobile }><AiOutlineShoppingCart/></Link>
                <button onClick={()=>{setToggle(true)}} className={HeaderCSS.menuButton}><AiOutlineMenu size={"18pt"}/></button>
                <button onClick={()=>{setToggle(true)}} className={HeaderCSS.buttonMobile}><AiOutlineMenu size={"18pt"}/></button>
                {toggle && <Dropdown/>}
            </div>
        </div>
    );

    
}

export default Header;
