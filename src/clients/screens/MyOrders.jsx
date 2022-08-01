import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import oscss from '../css/OrderStatus.module.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BsBoxArrowUpRight} from 'react-icons/bs'

const MyOrders = () => {

    const useremail = localStorage.getItem("useremail");
    const [arr,setArr] = React.useState([])

    const getMyOrders= () =>{
        axios.get(`https://ordering-system-database.herokuapp.com/api/myorders/${useremail}`).then((response)=>{
            setArr(response.data)
        })
    }

    React.useEffect(()=>{
        getMyOrders();
    },[])
 
    return(
        <div className={oscss.container}>
            <Header/>
                <h1 className={oscss.MOH1}>REQUEST HISTORY</h1>
                {
                    arr.map((order)=>{
                        return(
                            <div className={oscss.orderContainer}>
                                <p><b>REQUEST ID </b>{order.invoice_id}</p>
                                <p><b>STATUS </b>{order.status}</p>
                                <p><b>DATE OF REQUEST: </b>{order.orderdate.slice(0,10)}</p>
                                <Link to="/orderstatus"
                                    onClick={()=>{
                                        localStorage.setItem("orderinvoice", order.invoice_id);
                                        localStorage.setItem("orderstatus", order.status);
                                        localStorage.setItem("orderdetails", JSON.stringify(order.orderdetails));
                                        localStorage.setItem("orderaddress", order.customeraddress);
                                        localStorage.setItem("orderid", order.id)
                                    }}
                                ><button className={oscss.viewButton}>View Request<BsBoxArrowUpRight/></button></Link>
                            </div>
                        )
                    })
                }

        </div>
    );
}

export default MyOrders;