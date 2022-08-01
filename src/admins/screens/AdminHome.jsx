import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/AdminIndent.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function useKey(key,cb){
    const callbackRef = React.useRef(cb);
    console.log(key );

    React.useEffect(()=>{
        callbackRef.current = cb;
        
    })

    React.useEffect(()=>{
        const handlePress = (event) =>{
            if(event.code === key){
                callbackRef.current(event)
            }
        }
        document.addEventListener("keydown", handlePress);
        return ()=> document.removeEventListener("keydown", handlePress);
    }, [key])
}

function AdminHome(){
    const md5 = require('md5');
    function handleEscape(){
        navigate("/");
    }
    useKey("AltRight", handleEscape)
    const navigate = useNavigate();
    const initialValues = {email: "", password: "" };
    const [loginValues, setloginValues] = React.useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setloginValues({ ...loginValues, [name]: value });
    }

    const loginProcess = ()=>{
        let capsEmail = loginValues.email.toUpperCase();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        axios.post("https://ordering-system-database.herokuapp.com/api/admin/login", {
            email: capsEmail,
            password: md5(loginValues.password)
        }).then((response) => {
            console.log(response);
            // console.log(response.data.message)
            if(capsEmail === "" || loginValues.password === ""){
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Please Complete the Form',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass:{
                        icon: 'swalertIcon'
                    }
                })
            }else if(!regex.test(loginValues.email)){
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid Email Format',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass:{
                        icon: 'swalertIcon'
                    }
                })
            }else if(response.data.message){
                Swal.fire({
                    title: 'Login Failed',
                    text: response.data.message,
                    icon: 'warning',
                    // button:"OK",
                    customClass:{
                        icon: 'swalertIcon'
                    }
                })
            }else{
                
                localStorage.setItem("adminDummyToken", 1);
                localStorage.setItem("adminName", response.data[0].username);
                localStorage.setItem("adminEmail", response.data[0].email);
                localStorage.setItem("adminDate", response.data[0].date);
                localStorage.setItem("adminID", response.data[0].id);
                sessionStorage.setItem("currPass", md5(loginValues.password));
                navigate("/admin/sales");
                window.location.reload();
            }
        })
    }

    const login = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Verifying...',
            text: 'Please wait.',
            timer: 2000,
            didOpen: () => {
              Swal.showLoading();
              loginProcess();
            }
          })
    }


    return(
        <div className="adminhome">
            <div className="signin-container">
                <div className="signin-content">
                    <div className="signin-buttons">
                        <button
                        className='selector-active'>
                            ADMIN</button>
                    </div>
                    <div className='imgSignInContainer'>
                    <img alt="logo" className="imgSignIn" src={require('../../assets/images/mglogo.png')}/>
                    <div className="signin-forms-container">
                        <form className="signin-forms" onSubmit={login}>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                value={loginValues.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginValues.password}
                                onChange={handleChange} 
                            />
                            <input type="submit" className="signin-btn" value="ADMIN SIGN IN"/>
                        </form>
                    </div>
                    </div>
                    </div>
            </div>
        </div>
    );
}

export default AdminHome;