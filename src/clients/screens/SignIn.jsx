import React from 'react';
import styles from '../css/SignIn.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import Captcha from "captcha-image";
import {v4} from 'uuid'

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

export default function SignIn(){
    const md5 = require('md5');
    function handleEscape(){
        navigate("/admin");
    }
    useKey("Escape", handleEscape);
    const [addEmail, setAddEmail] = React.useState("");
    const [addPass, setAddPass] =  React.useState("");
    const [addCPass, setAddCPass] =  React.useState("");
    const [terms,setTerms] = React.useState(false);
    const [addCaptcha, setAddCaptcha] =  React.useState("");
    const [datas, setDatas] =  React.useState({ image: null });
    const { image } = datas;
    var captchaImageValue;
    

    function handleClick() {
        const captchaImage = new Captcha(
            "30px Courier",
            "center",
            "middle",
            150,
            75,
            "#fdd000",
            "black",
            5
          ).createImage();
          setDatas({ ...datas, image: captchaImage });
          console.log(captchaImage);
        
      }

      function createMarkup(source) {
        return { __html: source };
      }
      function MyCaptcha() {
        if (image === null)
          return <p id="returnValue">Please click to generate captcha image.</p>;
        else
        {
            captchaImageValue = image.slice(-15,-10);
            console.log(captchaImageValue);
        }
        return <div dangerouslySetInnerHTML={createMarkup(image)} />;
               
      }

    const userRegister = (e) =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        e.preventDefault();
        if(addCPass !== addPass){
            Swal.fire({
                title: 'Registration Failed',
                text: 'Passwords did not match.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass:{
                    icon: styles.swalertIcon
                }
            })
        }
        else if((addPass ==="" && addCPass === "") || addEmail===""){
            Swal.fire({
                title: 'Registration Failed',
                text: 'Please Complete the Form',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass:{
                    icon: styles.swalertIcon
                }
            })
        }
        else if(!regex.test(addEmail)){
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
        else if (terms === false){
            Swal.fire({
                title: 'Registration Failed',
                text: 'Terms and Agreements must be accepted.',
                icon: 'warning',
            })
        }
        else if(captchaImageValue !== addCaptcha){
            Swal.fire({
                title: 'Registration Failed',
                text: 'Invalid Captcha!',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass:{
                    icon: styles.swalertIcon
                }
            })
        }
        else{
            axios.post("https://ordering-system-database.herokuapp.com/api/user/register", {
                email: addEmail,
                password: md5(addPass),
                name: `USER${v4()}`
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

    const navigate = useNavigate();
    const initialValues = {email: "", password: "" };
    const [loginValues, setloginValues] = React.useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setloginValues({ ...loginValues, [name]: value });
    }

    const [data,setData] = React.useState({
        active1:false,
        active2:true,
    })

    React.useEffect(() => {
        console.log("march 27, 2022");
    }, []);

    const showTerms = () =>{
        Swal.fire({
            title: '<strong>TERMS AND AGREEMENT</strong>',
            width:'60vw',
            html:
              '<p>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. IF YOU DO NOT WISH TO BE BOUND BY THESE TERMS AND CONDITIONS, DO NOT ACCESS OR USE THE ONLINE BORROWING. YOUR ACCESS AND/OR USE OF THE ONLINE BORROWING SHALL BE DECLARED TO BE YOUR ACCEPTANCE OF THESE TERMS AND CONDITIONS.<br><br>'+
              'By accessing or using the pages of CpE Laboratory Borrowing System or any other world-wide website owned, operated, licensed, or controlled by CPE LABORATORY BORROWING SYSTEM, and/or installing, accessing, or using any mobile websites, email, and other digital properties, you agree to be bound by these Terms and any amendments we may introduce from time to time. By accepting these Terms, you also acknowledge and consent to the CPE LABORATORY BORROWING SYSTEM Privacy Policy, which is integrated into and becomes a part of these Terms.<br><br>'+
              'At CpE Laboratory Borrowing System, we aim to do everything in our power to honor the trust that our customers have placed in us, and our commitment to your privacy is no exception. We are dedicated to defending and securing consumer privacy on the internet, particularly for minors. The Online Services are not designed for or targeted towards children under the age of twelve (12). To use the Online Services, you must be at least 12 years old. If you are at least 12 years old but under the age of eighteen (18), you must review these Terms with your parent or guardian, and they must understand and agree to these Terms before you can use the Online Services.<br><br>'+
              'If you or your parent or guardian do not agree to these Terms, you must stop using the Online Services instantly and ask to CpE Laboratory Borrowing System cancel any Online Services account that you have registered. All requests for account/information deletion should be directed to the Contact information provided below. By accessing and/or using the Online Services, and continuing to access and/or use them by you or your kid, you are assumed to have provided your consent and authorization as a person of 18 years of age or older for such continuous access and/or use, and are deemed to have consented to the Terms.<br><br>'+
              'The licensor of the license agreement on the use of the application to order online owns and operates the online borrowing application.<br><br>'+
              'Without affecting the breadth of the present Terms and Conditions, but for the sake of clarification, you must also comply with the license agreement on the use of the application in order to place an order online.<br><br>'+
              'The CpE Laboratory Borrowing System shall take all reasonable precautions to ensure that the information relating to online ordering is accurate and reliable. However, this is not exact, and errors may arise from time to time. Before using online ordering, you should take the necessary procedures to check all information. To the greatest extent permissible by applicable law, the Restaurant expressly disclaims any guarantee or representation of any kind, express or implied, as to any subject whatsoever connected to online ordering, including, without limitation, the availability of the online ordering application.<br><br>'+
              'The CpE Laboratory Borrowing System maintains the right to amend the information related to the online ordering application and/or process at any time and without need to notify any past, current, or prospective clients. In no event shall the Restaurant be liable for any indirect, special, incidental, or consequential damages resulting from the use of the information included herein and/or the online ordering procedure.<br><br>'+
              'By ordering online, you accept and agree that you use the online ordering application and/or processes at your own risk and also that, to the greatest permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, losses, costs, or fees, nor for any loss in revenue, resulting from the use of, or inability to use, this online ordering and/or any application.<br><br>'+
              'Furthermore, we accept no responsibility for any changes made to the content of the online ordering application and/or process by unauthorized third parties. To the greatest extent permitted by applicable law, all express or implied guarantees or promises are excluded.<br><br>'+
              'The online ordering application and/or process may contain content, information, or links to third-party or third-party websites. The CpE Laboratory Borrowing System is not responsible for the content of any such sites, nor is it responsible for the content of any third-party advertising or sponsorship, nor is it responsible for their compliance with any rules. The user accesses the links at his or her own risk, and the Restaurant makes no claims or guarantees concerning the content, completeness, or accuracy of these connections or the sites hyperlinked to this ordering web application. You agree to indemnify and release the System from any and all liability arising from your use of third-party information or your use of any third-party website.<br><br>'+
              'Unless otherwise specifically noted, all information related to the online ordering application is the property of and/or available with the permission of the licensor of the license agreement regarding the use of the application in order to order online and holds usage rights over them and may not be copied, distributed, reproduced, or transmitted in any form or by any means, electronic, mechanical, photocopying, recording, or otherwise, without its prior written permission.<br><br>'+
              'If you wish to order online through the online ordering system, you may be required to submit full contact information and/or create an account, as well as accept cookies. You must keep your info private and not divulge it to anyone. If you violate the Terms and Conditions, the CpE Laboratory Borrowing System reserves the right to suspend your usage of the online borrowing system and/or process.<br><br>'+
              'You accept and agree that all orders are treated as an express intention to purchase the nominated products and/or services at the agreed-upon online prices, and that We treat this as a binding offer to purchase such products and services from you. Any changes must be made in writing, or they will not be binding on either side.<br><br>'+
              'Any order for any of the products and/or services will be accepted at the CpE Laboratory Borrowing System absolute discretion. When we accept an order, you will receive an on-screen message, an email notification, and/or an SMS confirming your order.<br><br>'+
              'The CpE Laboratory Borrowing System maintains the right, in its absolute discretion and without prior notice to you, to refuse any service, cancel your access to the online ordering application and/or process, remove or edit any content, or accept your order/s.<br><br>'+
              'All product images are purely for display purposes. The requested items may differ from the photographs on the website. The CpE Laboratory Borrowing System is not liable in any manner if the product description is incomplete. <br><br>'+
              'You are responsible for keeping your personal information, password, and payment information private. You agree to take full responsibility for all activity involving the online ordering system.<br><br>'+
              'Under these terms and conditions, you may not assign, sublicense, or otherwise transfer any of your rights. If any provision of this agreement is or becomes void, illegal, invalid, or inapplicable, it shall not affect the validity or applicability of the other contractual clauses, which shall remain in force and produce legal effects as if the void, illegal, invalid, or inapplicable clause had not been included in this agreement.<br><br>'+
              'Your statutory rights are unaffected by these Terms and Conditions.<br><br>'+
              'The Borrowing System\'s trademarks, as well as associated trademarks of others and related proprietary property, are protected from copying and simulation under national and international laws and may not be reproduced or copied without the CpE Laboratory Borrowing System\'s prior written permission.<br><br>'+
              'Here to fullest extent permitted by law, the CpE Laboratory Borrowing System disclaims all liability arising from its supply of the Products, including any loss or damage arising directly or indirectly from or in connection with any delay beyond the estimated delivery or pickup time; any circumstances over which the CpE Laboratory Borrowing System had no control of the consequences and which the CpE Laboratory Borrowing System could not avoid by exercising reasonable care; or any indirect or utmost care. In any case, the CpE Laboratory Borrowing System\'s liability to the Client is limited to the whole sum charged for the relevant products/and/or services.<br><br>'+
              'This Terms and Conditions shall be governed and construed in accordance with the laws of the country in which the CpE Laboratory Borrowing System is located, and the CpE Laboratory Borrowing System, as well as any dispute emerging out of or in connection with these, shall be decided to settle by the competent courts from the CpE Laboratory Borrowing System is located, without regard to conflict of laws.<br><br>'+
              '</p>',
            showCloseButton: true,
            customClass:{
                htmlContainer: styles.swalertHTMLContainer
            },  
            focusConfirm: false,
            confirmButtonText:
              'Sounds Great!',
          })
    }
    
    const loginProcess = () => {
        let capsEmail = loginValues.email.toUpperCase();
        axios.post("https://ordering-system-database.herokuapp.com/api/user/login", {
                    email: capsEmail,
                    password: md5(loginValues.password)
                }).then((response) => {
                    console.log(response);
                    console.log(response.data.message)
                    if(!response.data.message){
                        localStorage.setItem("dummyToken", 1);
                        localStorage.setItem("useremail", response.data[0].email);
                        localStorage.setItem("username", response.data[0].name);
                        localStorage.setItem("number", response.data[0].contact);
                        localStorage.setItem("address", response.data[0].address);
                        localStorage.setItem("userid", response.data[0].id);
                        sessionStorage.setItem("password", response.data[0].password);
                        navigate("/home");
                        window.location.reload();
                    }else{
                            Swal.fire({
                                title: 'Login Failed',
                                text: response.data.message,
                                timer: 2000,
                            })
                    }
                })
    }

    const login = (e)=>{
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
        <div className={styles.container}>
            <div className={styles.signinContainer}>
                <div className={styles.signinContent}>
                    <div className={styles.signinButtons}>
                        <button 
                            onClick={() => setData({
                                ...data,
                                active1:true,
                                active2:false
                            })}
                            className={data.active1===true? styles.selectorActive: styles.selector}>
                            SIGN UP
                        </button>
                        <button 
                            onClick={() => setData({
                                ...data,
                                active2:true,
                                active1:false
                            })}
                            className={data.active2===true? styles.selectorActive: styles.selector}>
                            SIGN IN
                        </button>
                    </div>
                    <div className={styles.imgSignInContainer}>
                    <img alt="logo" className={styles.imgSignIn} src={require('../../assets/images/mglogo.png')}/>
                    {/* CONDITIONAL RENDERING */}
                    {
                        data.active1 === true?
                        (
                            <div className={styles.signinFormsContainer}>
                                <form className={styles.signinForms} onSubmit={userRegister}>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={(e) => {
                                            setAddEmail(e.target.value.toUpperCase())
                                        }}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => {
                                            setAddPass(e.target.value)
                                        }}
                                    />
                                    <input
                                        type="password"
                                        name="cpassword"
                                        placeholder="Confirm Password"
                                        value={addCPass}
                                        onChange={(e) => {
                                            setAddCPass(e.target.value)
                                        }}
                                    />
                                    <div className={styles.checkBoxDiv}>
                                    <input
                                        type = "checkbox"
                                        name = "terms"
                                        onClick={()=>{
                                            setTerms(!terms);
                                            // console.log(terms);
                                        }}
                                    />
                                    <p className={styles.checkBoxDivP} onClick={showTerms}>Terms and Agreement</p>
                                    </div>
                                     
                                    <p className={styles.captchaGenText} onClick={() => handleClick()}>Generate Captcha</p>
                                    <MyCaptcha />
                                    

                                    <input
                                        type="text"
                                        name="captcha"
                                        placeholder="Insert Captcha"
                                        onChange={(e) => {
                                            setAddCaptcha(e.target.value)
                                        }}
                                    />
                                    <input type="submit" className={styles.signinBtn} value="SIGN UP"/>
                                </form>
                            </div>
                        ):(
                            <div className={styles.signinFormsContainer}>
                                <form className={styles.signinForms} onSubmit={login}>
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
                                    <input type="submit" className={styles.signinBtn} value="SIGN IN"/>
                                </form>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}