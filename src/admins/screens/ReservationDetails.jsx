import React from 'react';
import Sidebar from '../components/Sidebar';
import '../css/AdminIndent.css';
import ReservationCard from '../components/reservationcard';

function ReservationDetails(){
    return(
        <div className="reservationdetails">
            <Sidebar></Sidebar>

            <div className="pagecontent">
                {/* Page heading */}
                <div className="flex-container-header">
                    <h1>ROOM RESERVATION</h1>
                    <div className="header-buttons">
                        <button className="cancelbtn">CANCEL RESERVATION</button>
                        <button className="confirm-order-btn">CONFIRM RESERVATION</button>
                    </div>  
                </div>

                <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
                
                {/* Page body */}
                <div className="reservation-details-content">
                    <ReservationCard></ReservationCard>
                </div>
            </div>
        </div>
    );
}

export default ReservationDetails;