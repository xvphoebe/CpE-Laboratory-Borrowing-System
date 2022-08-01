import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../css/Sidebar.css'
import Sales from '../components/images/sales.png';
import Orders from '../components/images/orders.png';
import Products from '../components/images/products.png';
import Reservation from '../components/images/reservation.png';
import Accounts from '../components/images/accounts.png';
import Profile from '../components/images/profile.png';
import Settings from '../components/images/setting.png';
import Logout from '../components/images/exit.png';

function Sidebar(){
    const location = useLocation();

    return(
        <div className = "sidebar">
            <h1 className="sidebar-heading">CpE Laboratory Admin</h1>
            <div className="adminbutton-list">
                    <Link style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin/sales">
                        <div className={location.pathname == "/admin/sales" ? "flex-container-active" : "flex-container"}>
                            <p>BORROW REPORT</p>
                        </div>
                    </Link>

                     <Link style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin/products">
                        <div className={location.pathname == "/admin/products" ? "flex-container-active" : "flex-container"}>
                            <p>ITEM MANAGEMENT</p>
                        </div>
                    </Link>
                     <Link style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin/reservation">
                        <div className={location.pathname == "/admin/reservation" ? "flex-container-active" : "flex-container"}>
                            <p>ROOM RESERVATIONS</p>    
                         </div>
                    </Link>
                     <Link style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin/account">
                        <div className={location.pathname == "/admin/account" ? "flex-container-active" : "flex-container"}>
                            <p>ACCOUNTS</p>
                         </div>
                    </Link>
                    <div className="hr"></div>
                     <Link style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin/profile">
                        <div className={location.pathname == "/admin/profile" ? "flex-container-active" : "flex-container"}>
                            <p>PROFILE</p>
                         </div>
                    </Link>
                     <Link style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin/settings">
                        <div className={location.pathname == "/admin/settings" ? "flex-container-active" : "flex-container"}>
                            <p>SETTINGS</p>
                         </div>
                    </Link>
                     <Link onClick={()=>{
                         localStorage.clear();
                         sessionStorage.clear();
                         }} style={{textDecoration:'none', color:"black", fontSize:"18px"}} to = "/admin">
                         <div className="flex-container">
                            <p>LOGOUT</p>
                         </div>
                    </Link>
            </div>
        </div>
    );
}

export default Sidebar;