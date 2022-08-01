import React from 'react';
import '../css/reservationcard.css'

function ReservationCard(){
    return(
        <div className="reservationcard">
            <div className="cardcontainer">
                <h3>RESERVATION DETAILS</h3>

                <div className="flex-row">
                    <div className="customername">
                        <h4>CUSTOMER NAME</h4>
                        <p>lorem ipsum</p>
                    </div>

                    <div className="seats">
                        <h4>SEATS</h4>
                        <p>1</p>
                    </div>
                </div>

                <div className="reservationdate">
                        <h4>RESERVATION DATE</h4>
                        <p>mm/dd/yyyy</p>
                </div>

                <div className="reservationtime">
                    <h4>RESERVATION TIME</h4>
                    <p>00 AM/PM</p>
                </div>

                <div className="emailaddress">
                    <h4>EMAIL ADDRESS</h4>
                    <p>loremipsum@yahoo.com</p>
                </div>
            </div>
        </div>   
    );
}

export default ReservationCard;