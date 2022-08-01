import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsCSS from '../css/ContactUs.module.css';
import Swal from 'sweetalert2'

const ContactUs = () => {

const [status, setStatus] = React.useState("Submit");
const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    setStatus("Sending...");
    const { fname, lname, email, msg } = e.target.elements;
    let details = {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      msg: msg.value,
    };
    let response = await fetch("https://ordering-system-database.herokuapp.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
    Swal.fire({
        title: 'Message sent!',
        text: 'Thank you for getting in touch with us.',
        icon: 'success',
        timer:2000,
        showConfirmButton: false,
        customClass:{
            icon: 'swalertIcon'
        }
    }).then((response) => {
    // window.location.reload();
    console.log(response)
    })
  };
    
    return(
        <div className={ContactUsCSS.container}>
            <Header/>
            <div className={ContactUsCSS.imageContainer}> 
              <div className={ContactUsCSS.overlay}></div>
              <img className={ContactUsCSS.contactImage} src={require('../../assets/images/contactus.jpg')}/>
              <div className={ContactUsCSS.contactInfo}>
                <div className={ContactUsCSS.infoContainer}>
                    <p><b>GIVE US A CALL</b></p>
                    <p>☎ 277136009</p>
                </div>
                <div className={ContactUsCSS.infoContainer}>
                    <p><b>EMAIL US</b></p>
                    <p>✉ dcoe.pup@gmail.com</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ContactUs;