import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsCSS from '../css/ContactUs.module.css';

const AboutUs = () => {
 
    return(
        <div className={ContactUsCSS.container}>
            <Header/>
            <div className={ContactUsCSS.imageContainer}> 
                <div className={ContactUsCSS.overlay}></div>
                <img className={ContactUsCSS.contactImage} src={require('../../assets/images/contactus.jpg')}/>
                
            </div>
            <Footer/>
        </div>
    );
}

export default AboutUs;