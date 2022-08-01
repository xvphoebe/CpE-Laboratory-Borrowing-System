import React from "react";
import '../css/UserProfile.css';
import {AiFillEdit} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

//COMPONENT IMPORTS
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserProfile (){
    const navigate = useNavigate();
    const address = localStorage.getItem("address")
    const name = localStorage.getItem("username")
    const number = localStorage.getItem("number")
    const email = localStorage.getItem("useremail")
    const studentno = ["2018-00000-MN-0"]

    return(
        <div className="container">
            <Header/>
            <div className="profile">
                <div className="main-info">
                    <div className="profile-image"></div>
                    <h3>{name}<AiFillEdit 
                    size={'20pt'} style={{cursor:'pointer'}}
                    onClick={()=>{
                        navigate("/editprofile");
                    }}/></h3>
                    <h3>{studentno}</h3>
                </div>

                <div className="sub-info">
                    <div className="email">
                        <h3>EMAIL ADDRESS</h3>
                        <p>{email}</p>
                    </div> 
                    <div className="address">
                        <h3>DEFAULT ADDRESS</h3>
                        <p>{address}</p>
                    </div>
                    
                    <div className="contactnumber">
                        <h3>CONTACT NUMBER</h3>
                        <p>{number}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default UserProfile;