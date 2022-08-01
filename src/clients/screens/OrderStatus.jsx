import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderStatusCSS from '../css/OrderStatus.module.css';
import {AiOutlineCreditCard, AiFillCheckCircle} from 'react-icons/ai';
import {BsTruck, BsAwardFill} from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENT IMPORTS
import Header from '../components/Header';



function OrderStatus(){
    const orderList = JSON.parse(localStorage.getItem("orderdetails"));
    const invoice = localStorage.getItem("orderinvoice");
    const status = localStorage.getItem("orderstatus");
    const address = localStorage.getItem("orderaddress");
    const  id = localStorage.getItem("orderid")
    let total = 0;

    const updateStatus = () =>{
        // console.log(id,status);
        Swal.fire({
            title: 'Confirm Order?',
            text: "Press 'Yes' only if you have received your order.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            customClass:{
                icon: OrderStatusCSS.swalertIcon
            }
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://ordering-system-database.herokuapp.com/api/admin/updateorder`,{
                    id : id,
                    status: "completed"
                }).then((response)=>{
                        localStorage.setItem("orderstatus", "completed")
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Complete!',
                            text: 'Thank you for your order.',
                            customClass:{
                                icon:OrderStatusCSS.swalertIcon
                            }
                        }).then((response)=>{
                            window.location.reload();
                        })
                })
            }
          })
    }
    
    return(
        <div className={OrderStatusCSS.orderStatus}>
            <Header/>
                <div className={OrderStatusCSS.orderStatusContainer}>
                    <div className={OrderStatusCSS.orderHeader}>
                        <h1>REQUEST HISTORY</h1>

                    <div className={OrderStatusCSS.orderscontainer}>
                        {
                            JSON.parse(orderList).map((item)=>{
                                total=total+item.price;
                                return(
                                    <div className={OrderStatusCSS.productcontainer}>
                                        <div className={OrderStatusCSS.quantity}>{item.quant}x</div>
                                        <div className={OrderStatusCSS.productname}>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                        <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
                        <div className={OrderStatusCSS.totalcontainer}>
                            <p>TOTAL ITEMS</p>
                            <div className={OrderStatusCSS.totalprice}>{total}</div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default OrderStatus;