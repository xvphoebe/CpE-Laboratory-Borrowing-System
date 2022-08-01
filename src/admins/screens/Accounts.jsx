import React, {useEffect, useState} from 'react';
import styles from '../../clients/css/SignIn.module.css';
import Sidebar from '../components/Sidebar';
import '../css/AdminIndent.css'
import axios from "axios";
import Swal from 'sweetalert2'

function Accounts(){
    const md5 = require('md5')
    const [addUser, setaddUser] = React.useState("");
    const [addEmail, setaddEmail] = React.useState("");
    const [addPassword, setaddPassword] = React.useState("");

    const adminRegister = (e) =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        e.preventDefault();
        
        if(!regex.test(addEmail)){
            Swal.fire({
                title: 'Registration Failed',
                text: 'Invalid Email Format',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass:{
                    icon: styles.swalertIcon
                }
            })
        }
        else{
            axios.post("https://ordering-system-database.herokuapp.com/api/admin/accounts", {
                email: addEmail,
                password: md5(addPassword),
                username: addUser,
            }).then((response) => {
                console.log(response)
                if(response.data.message){
                    Swal.fire({
                        title: 'Registration Failed',
                        text: response.data.message,
                        icon: 'warning',
                        button:"OK",
                        customClass:{
                            icon: styles.swalertIcon
                        }
                    })
                }
                
            })

            //Dito mo nalang siguro lagay si Captcha
            Swal.fire({
                title: 'Registration Successful',
                text: 'Account successfully created.',
                icon: 'success',
                timer:2000,
                showConfirmButton: false,
                customClass:{
                    icon: styles.swalertIcon
                }
            })
        }
    }


    return(
        <div className="accounts">
            <Sidebar></Sidebar>
            
            <div className="pagecontent">
                <h1>ADD ACCOUNTS</h1>
                <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
            
            {/* Page body */}
            <div className="account-content">
                    <form className='account-form' onSubmit={adminRegister}>
                        <label>ACCOUNT NAME</label>
                            <input 
                                type="text" 
                                name="accname"
                                onChange={(e) => {
                                    setaddUser(e.target.value.toUpperCase())
                                }}
                                required
                            />
                        
                        <label>EMAIL ADDRESS</label>
                            <input 
                                type="email" 
                                name="email" 
                                onChange={(e) => {
                                    setaddEmail(e.target.value.toUpperCase())
                                }}
                                required
                            />

                        <label>PASSWORD</label>
                            <input 
                                type="password" 
                                name="password" 
                                onChange={(e) => {
                                    setaddPassword(e.target.value)
                                }}
                                required
                            />
                        
                        <div className="form-buttons">
                            <button className="cancel-btn">CANCEL</button>
                            <button className="submit-btn">SAVE</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
}

export default Accounts;