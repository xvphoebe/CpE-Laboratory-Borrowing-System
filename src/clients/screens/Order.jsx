import React from 'react';
import '../css/Order.css';

//COMPONENT IMPORTS
import Header from '../components/Header';
import DeliverTo from '../components/DeliverToCard';
import OrdersCard from '../components/OrdersCard';

function Order(){
    const [data,setData] = React.useState({
        orders:true,
        deliverTo:false,
    })

    // const confirm = () => {
    //     setData({
    //         ...data,
    //         deliverTo:false,
    //         orders:false,
    //         payment:true
    //     })
    // }
    
    return(
        <div className="order">
            <Header/>
                <div className="ordercontainer">
                    <div className="orderheader">
                        <h1>EQUIPMENT REQUESTS</h1>
                        <div className='headerbuttons'>
                            <button
                            onClick={() => setData({
                                ...data,
                                deliverTo:false,
                                orders:true,
                            })}
                            className={data.orders?"orderButtonActive":"orderButton"}>ITEMS</button>
                        </div>
                    </div>
                    <div className='contentContainer'>
                        {data.orders && <OrdersCard confirmHandler={()=>{
                            setData({
                                ...data,
                                deliverTo:true,
                                orders:false,
                            })
                        }}/>}
                        {data.deliverTo && <DeliverTo confirmHandler={()=>{
                            setData({
                                ...data,
                                deliverTo:false,
                                orders:false,
                            })
                        }}/>}
                    </div>
                </div>
        </div>
    );
}

export default Order;