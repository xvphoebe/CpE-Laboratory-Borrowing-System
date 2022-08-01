import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import '../css/AdminIndent.css'
import axios from "axios";

function Profile(){

    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("")

    // const getContent = () =>{
    //     axios.get("https://ordering-system-database.herokuapp.com/api/admin/profile")
    //         .then((response) => {
    //             setEmail(response.data[0].email);
    //             setName(response.data[0].username);
    //             setDate(response.data[0].date);
    //     });
    // }

    React.useEffect(() => {
        setEmail(localStorage.getItem("adminEmail"));
        setName(localStorage.getItem("adminName"));
        setDate(localStorage.getItem("adminDate"));
        // getContent();
    }, []);

    return(
        <div className="profileContainer">
            <Sidebar/>
            
            <div className="pagecontent">
                <h1>PROFILE</h1>
                <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
            
            <div className="profile-content">
                <form className='profile-form'>
                    <label>ACCOUNT NAME</label>
                        <input 
                            type="text" 
                            value={name}
                            name="accname"
                            disabled={true}
                        />
                        
                    <label>EMAIL ADDRESS</label>
                        <input 
                            type="email"
                            value={email}
                            name="email"
                            disabled={true} 
                        />

                    <label>REGISTRATION DATE</label>
                        <input 
                            type="text" 
                            name="date"
                            value="2022-07-26T09:04:08.000Z"
                            disabled={true} 
                        />
                </form>
            </div>
            </div>
        </div>
    );
}

export default Profile;