import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationCSS from '../css/Reservation.module.css';
import axios from 'axios';
import Swal from 'sweetalert2'


function Reservations(){ 
    const [addDate, setAddDate] = React.useState("");
    const [addTime, setAddTime] = React.useState("");
    const [addPartySize, setAddPartySize] = React.useState("");
    const [addName, setAddName] = React.useState("");
    const [addStudentNum, setAddStudentNum] = React.useState("");
    const [phoneNum, setPhoneNum] = React.useState("")
    const addReservation = (e) =>{
        e.preventDefault();
        // console.log(addDate);
        // console.log(addTime);
        // console.log(addPartySize);
        // console.log(addName);
        // console.log(addEmail);
        const regex = /^(09|\+639)\d{9}$/;
        
        if(addDate ==="" || addTime === "" || addPartySize==="" || addName==="" ||  addStudentNum ===""){ 
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
                partysize: addPartySize,
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
    
    return(
        <div className = "reservations-page">
            <Header/>
            <div className={ReservationCSS.mainReservation}>
                    <div className={ReservationCSS.formGroupContainer}>
                        <h1 className={ReservationCSS.reservationForm}>ROOM RESERVATION</h1>
                        <p>For further questions, please contact us</p>
                        <div className={ReservationCSS.schedForm}>
                            <div className={ReservationCSS.schedInputs}>
                                DATE
                                <input type="date" name="date" onChange={(e) => setAddDate(e.target.value)}/>
                            </div>
                            <div className={ReservationCSS.schedInputs} onChange={(e) => setAddTime(e.target.value)}>
                                TIME
                                <input type="text" name="time"/>
                            </div>
                            <div className={ReservationCSS.schedInputs} onChange={(e) => setAddPartySize(e.target.value)}>
                                ROOM
                                <input type="text" name="room"/>
                            </div>
                        </div>
                        
                        <div className={ReservationCSS.infoForm}> 
                            <p>NAME</p>
                            <input type="text" name="name" onChange={(e) => setAddName(e.target.value)}/>
                            <p>STUDENT NUMBER</p> 
                            <input type="text" name="studentnum" onChange={(e) => setAddStudentNum(e.target.value)}/>
                            <p>CONTACT NUMBER</p> 
                            <input type="number" name="phonenum" onChange={(e) => setPhoneNum(e.target.value)}/>
                        </div>
                        <button className={ReservationCSS.formButton} onClick={addReservation}> 
                            RESERVE NOW
                        </button>
                    </div>
                </div> 
        </div>
    );
}

export default Reservations;