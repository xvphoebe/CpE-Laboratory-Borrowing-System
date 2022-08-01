import React from 'react';
import FooterCSS from '../css/Footer.module.css';
import {Link} from 'react-router-dom';

function Footer(){
    return(
        <div className={FooterCSS.container}>

            <div className={FooterCSS.title}>
                <h2>COMPUTER ENGINEERING<br/>LABORATORY BORROWING SYSTEM</h2>
            </div>

            <div>
                <div className={FooterCSS.buttonsContainer}>
                    <Link className={FooterCSS.button} to='/home'><p>HOME</p></Link>
                    <Link className={FooterCSS.button} to='/category'><p>CATEGORY</p></Link>
                    <Link className={FooterCSS.button} to='/reservations'><p> ROOM RESERVATIONS</p></Link>
                    <Link className={FooterCSS.button} to='/contactus'><p>CONTACT US</p></Link>
                </div>
                <div className={FooterCSS.rightSecond}>
                    <div className={FooterCSS.frs1}>
                        📧 pupcpe@gmail.com
                    </div>
                    {/* <div className={FooterCSS.frs2}>
                        <button className={FooterCSS.regibutton}>REGISTER</button>
                        <button className={FooterCSS.loginbutton}>LOG IN</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Footer;