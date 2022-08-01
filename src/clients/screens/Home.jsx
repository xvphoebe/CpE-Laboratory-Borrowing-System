import React from 'react';
import { Link } from 'react-router-dom';
import HomeCSS from '../css/Home.module.css';
import Header from '../components/Header';  
import axios from "axios";
import Swal from 'sweetalert2';
import OrdersCard from '../components/OrdersCard';


function Home(){
//for reservations
    const [addDate, setAddDate] = React.useState("");
    const [addTime, setAddTime] = React.useState("");
    const [addRoom, setAddRoom] = React.useState("");
    const [addName, setAddName] = React.useState("");
    const [addStudentNum, setAddStudentNum] = React.useState("");
    const [phoneNum, setPhoneNum] = React.useState("")
    
    const [arr,setArr] = React.useState([])

    const addReservation = (e) =>{
        e.preventDefault();
        // console.log(addDate);
        // console.log(addTime);
        // console.log(addPartySize);
        // console.log(addName);
        // console.log(addEmail);
        const regex = /^(09|\+639)\d{9}$/;
        
        if(addDate ==="" || addTime === "" || addRoom==="" || addName==="" ||  addStudentNum ===""){ 
            Swal.fire({
                title: 'Reservation Failed!',
                text: 'Please Complete the Form',
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass:{
                    icon: 'swalertIcon'
                }
            })
        }
        else if(!regex.test(phoneNum)){
            Swal.fire({
                title: 'Process Failed',
                text: 'Wrong Cellphone Number Format',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass:{
                    icon: 'swalertIcon'
                }
            })
        }
        else {
            axios.post("https://ordering-system-database.herokuapp.com/api/reservations/get", {
                date: addDate,
                time: addTime,
                room: addRoom,
                name: addName,
                studentnum: addStudentNum,
                phone: phoneNum
            }).then((response) => {
                console.log(response.data) 
            })
            Swal.fire({
                title: 'Reservation Created',
                text: 'Please wait on your email/phone about the status of the reservation.',
                icon: 'success',
                timer:2000,
                showConfirmButton: false,
                customClass:{
                    icon: 'swalertIcon'
                }
            }).then((response) => {
                window.location.reload();
            })
        }
    }

    const getDrinks = () =>{
        axios.get("https://ordering-system-database.herokuapp.com/api/drinks/get")
            .then((response) => {
               setArr(response.data)
        });
    }
    
    React.useEffect(() => {
        getDrinks();
    }, []);

    return(
        <div className = {HomeCSS.home}>
            <Header/>
            <div className={HomeCSS.firstSection}>
                <div className={HomeCSS.homeTitle}>
                   COMPUTER ENGINEERING LABORATORY BORROWING SYSTEM
                </div>
                <hr></hr>
                <h1 className={HomeCSS.topSecond}>ONGOING REQUEST</h1>
                <OrdersCard/>
            </div>

            <div className={HomeCSS.reservation}>
                <div className={HomeCSS.topReservation}>
                    <h1>ROOM RESERVATION</h1>
                </div>
                
                <div className={HomeCSS.mainReservation}>
                    {/* <div className={HomeCSS.circle1}></div> */}
                    <div className={HomeCSS.formGroupContainer}>
                        <h1  className={HomeCSS.reservationForm}>ROOM RESERVATION</h1>
                        <p>For further questions, please contact us</p>
                        <form className={HomeCSS.schedForm}>
                            <div className={HomeCSS.schedInputs}>
                                DATE
                                <input type="date" name="date" onChange={(e) => setAddDate(e.target.value)}/>
                            </div>
                            <div className={HomeCSS.schedInputs}>
                                TIME
                                <input type="text" name="time" onChange={(e) => setAddTime(e.target.value)}/>
                            </div>
                            <div className={HomeCSS.schedInputs}>
                                ROOM
                                <input type="text" name="room" onChange={(e) => setAddRoom(e.target.value)}/>
                            </div>
                        </form>
                        
                        <div className={HomeCSS.infoForm}>
                            <p>NAME</p>
                            <input type="text" name="name" onChange={(e) => setAddName(e.target.value)}/>
                            <p>STUDENT NUMBER</p>
                            <input type="text" name="studentnum" onChange={(e) => setAddStudentNum(e.target.value)}/>
                            <p>CONTACT NUMBER</p> 
                            <input type="number" name="phonenum" onChange={(e) => setPhoneNum(e.target.value)}/>
                        </div>
                        <button className={HomeCSS.formButton} onClick={addReservation}>
                            RESERVE NOW
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;