import React from "react";
import EditProfileCSS from '../css/EditProfile.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENT IMPORTS
import Header from '../components/Header';
import Footer from '../components/Footer';

function EditProfile (){
    const md5 = require('md5');
    const [newAddress, setNewAddress] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [newNumber, setNewNumber] = React.useState("");
    const [currPass, setCurrPass] = React.useState("");
    const currPassCheck = (sessionStorage.getItem("password"));
    const [newPassword, setNewPassword] = React.useState("");
    const [passCheck, setPassCheck] = React.useState("")

    React.useEffect(()=>{
        setNewAddress(localStorage.getItem("address"));
        setNewName(localStorage.getItem("username"));
        setNewNumber(localStorage.getItem("number"));
        setNewPassword(sessionStorage.getItem("password"));
    },[])

    const submitEdit = (e) =>{
        e.preventDefault();
        const regex = /^(09|\+639)\d{9}$/;
        console.log(localStorage.getItem("userid"), newAddress, newName, newNumber);
        Swal.fire({
            title: 'Verifying...',
            text: 'Please wait.',
            timer: 2000,
            didOpen: () => {
              Swal.showLoading();
              if((md5(currPass) !== currPassCheck) && currPass!==""){
                Swal.fire({
                    title: 'Password Change Failed',
                    text: 'Incorrect Password',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass:{
                        icon: EditProfileCSS.swalertIcon
                    }
                })
              }else if(!regex.test(newNumber) && newNumber!==""){
                Swal.fire({
                    title: 'Process Failed',
                    text: 'Wrong Cellphone Number Format',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass:{
                        icon: 'swalertIcon'
                    }
                })
            }else if((passCheck !== newPassword) && newPassword === ""){
                Swal.fire({
                    title: 'Password Change Failed',
                    text: 'Passwords do not match',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass:{
                        icon: EditProfileCSS.swalertIcon
                    }
                })
              }else{
                axios.put(`https://ordering-system-database.herokuapp.com/api/editprofile`,{
                    id : localStorage.getItem("userid"),
                    address: newAddress,
                    name: newName,
                    number:newNumber,
                    password: newPassword
                    }).then((response)=>{
                        console.log(response)
                        localStorage.setItem("address", newAddress);
                        localStorage.setItem("username", newName);
                        localStorage.setItem("number", newNumber);
                        window.location.reload()
                })
                
              }
            }
        })
    }

    return(
        <div className="container">
            <Header/>
            <div className={EditProfileCSS.EditProfile}>
                <div className={EditProfileCSS.mainInfo}>
                    {/* <div className={EditProfileCSS.profileImage}></div> */}

                    <div className={EditProfileCSS.flexContainer}>
                        <h3>NAME</h3><br/>
                        <input
                            type="text"
                            name="name"
                            className={EditProfileCSS.margin}
                            placeholder={localStorage.getItem("username")}
                            onChange={(e)=>setNewName(e.target.value)}
                        />
                        <h3>EMAIL ADDRESS</h3><br/>
                        <p><b>{localStorage.getItem("useremail")}</b></p>
                    </div>
                </div>

                <div className={EditProfileCSS.subInfo}>
                    <form className={EditProfileCSS.profileForms}>
                        <div className={EditProfileCSS.flexRowContainer}>
                            <div className={EditProfileCSS.flexContainer}>
                                <label>DEFAULT ADDRESS</label>
                                <input
                                    type="text"
                                    name="address"
                                    className={EditProfileCSS.margin}
                                    placeholder={localStorage.getItem("address")}
                                    onChange={(e)=>setNewAddress(e.target.value)}
                                />
                            </div>
                            
                            <div className={EditProfileCSS.flexContainer}>
                                <label>CONTACT NUMBER</label>
                                <input
                                    type="text"
                                    name="number"
                                    placeholder={localStorage.getItem("number")}
                                    onChange={(e)=>setNewNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={EditProfileCSS.flexContainer}>
                            <label>CURRENT PASSWORD</label>
                            <input
                                type="password"
                                name="currpassword"
                                onChange={(e)=>setCurrPass(e.target.value)}
                            />
                        </div>

                        <div className={EditProfileCSS.flexRowContainer}>
                            <div className={EditProfileCSS.flexContainer}>
                                <label>NEW PASSWORD</label>
                                <input
                                    type="password"
                                    name="newpassword"
                                    className={EditProfileCSS.margin}
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                            </div>
                            
                            <div className={EditProfileCSS.flexContainer}>
                                <label>CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    onChange={(e)=>setPassCheck(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={EditProfileCSS.buttons}>
                            <button className={EditProfileCSS.cancelButton}>CANCEL</button>
                            <button onClick={submitEdit} className={EditProfileCSS.saveButton}>SAVE</button>
                        </div>
                    </form>

                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditProfile;