import React from 'react';
import '../css/ordercard.css'

function OrderCard(){
    return(
        <div className="ordercard">
            <div className="cardcontainer">
                <h3>CUSTOMER DETAILS</h3>

                <div className="flex-row">
                    <div className="customername">
                        <h4>CUSTOMER NAME</h4>
                        <p>lorem ipsum</p>
                    </div>

                    <div className="invoicedate">
                        <h4>INVOICE DATE</h4>
                        <p>mm/dd/yyyy hh:mm</p>
                    </div>
                </div>

                <div className="address">
                    <h4>DELIVERY ADDRESS</h4>
                    <p>lorem ipsum</p>
                </div>

                <div className="contactnumber">
                    <h4>CONTACT NUMBER</h4>
                    <p>09123456789</p>
                </div>

                <div className="emailaddress">
                    <h4>EMAIL ADDRESS</h4>
                    <p>loremipsum@yahoo.com</p>
                </div>
            </div>

            <div className="cardcontainer">
                <h3>ORDERS</h3>

                <div className="flex-row">
                    <div className="productname">
                        <h4>PRODUCT NAME</h4>
                        <p>lorem ipsum</p>
                    </div>

                    <div className="productprice">
                        <h4>PRODUCT PRICE</h4>
                    <p>Php 000.00</p>
                    </div>
                </div>

                <div className="totalprice">
                    <h4>TOTAL PRICE</h4>
                    <p>Php 000.00</p>
                </div>
            </div>

            <div className="cardcontainer">
                <h3>PAYMENT</h3>

                <div className="paymentmethod">
                    <h4>PAYMENT METHOD</h4>
                    <p>lorem ipsum</p>
                </div>

                <div className="paymentproof">
                    <h4>PAYMENT PROOF</h4>
                    <p>Uploaded Image</p>
                </div>
            </div>
        </div>   
    );
}

export default OrderCard;