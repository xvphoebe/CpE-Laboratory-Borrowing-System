import React from 'react';
import Sidebar from '../components/Sidebar';
import '../css/AdminIndent.css';
import axios from 'axios'
import Swal from 'sweetalert2'
import Modal from 'react-modal';
import {listAll, ref,getDownloadURL} from 'firebase/storage';
import {storage} from '../../firebase';

function OrderPage(){

    const [arr,setArr] = React.useState([]);
    const [status, setStatus] = React.useState(localStorage.getItem("status"));
    const [id, setId] = React.useState("")
    const [openModal, setOpenModal] = React.useState(false);
    const imageRef = ref(storage, "images/")
    const [imageArr, setImageArr] = React.useState([])
    const getOrders = () =>{
        axios.get("https://ordering-system-database.herokuapp.com/api/admin/orders")
            .then((response) => {
                setArr(response.data);
        });
    }

    const deleteOrder = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass:{
                icon:'swalertIcon'
            }
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://ordering-system-database.herokuapp.com/api/admin/orderdelete/${id}`)
                .then((response)=>{
                    setArr(arr.filter((val)=>{
                        return val.id != id
                    }))
                })
                Swal.fire({
                    title: 'Success',
                    text: 'Order Deleted',
                    icon:'success',
                    customClass:{
                        icon:'swalertIcon'
                    }
                })
            }
          })
    }

    const submitUpdate = ()=>{
        console.log(id,status);
        axios.put(`https://ordering-system-database.herokuapp.com/api/admin/updateorder`,{
            id : id,
            status: status
        }).then((response)=>{
                console.log(response)
                window.location.reload();
        })
    }

    React.useEffect(() => {
        getOrders();
        console.log("Array: ", arr);
        listAll(imageRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageArr((prev)=>[...prev, url])
                    console.log(imageArr)//
                })
            })
        })
    }, []);
//
    return(
        <div className="orderpage">
            <Sidebar></Sidebar>
            
            <div className="pagecontent">
                {/* Page Heading */}
                <div className="flex-container-header">
                    <h1>ORDERS</h1>
                    {/* <form>
                        <input 
                            type="text"
                            name="search"
                            placeholder='Search'
                        />
                    </form> */}
                </div>
                <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
            
            <div className="order-table">
                {/* <OrderPageTable></OrderPageTable> */}
                <table className='admintables'>
                    <thead>
                        <tr>
                            <th className='adminth'>#</th>
                            <th className='adminth'>Invoice ID</th>
                            <th className='adminth'>Customer Name</th>
                            <th className='adminth'>Date Ordered</th>
                            <th className='adminth'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr.map((item, index)=> {
                                if(!openModal){
                                    localStorage.setItem("Order", JSON.stringify([]))
                                    localStorage.setItem("path", "select one order")
                                    localStorage.setItem("paymethod", 'select one order')
                                    localStorage.setItem("ship", 'select one order')
                                }
                                let dataj = JSON.parse(item.orderdetails)
                                let datad = JSON.parse(localStorage.getItem("Order"))
                                let imagepath = localStorage.getItem('path');
                                let orderstatus = localStorage.getItem('status')
                                let paymethod = localStorage.getItem('paymethod')
                                let notes = localStorage.getItem('notes')
                                let shipmethod = localStorage.getItem('ship')
                                let total = 0;
                                return(
                                    <tr key={index}>
                                        <Modal style={{
                                            overlay:{
                                                backgroundColor:'rgba(0, 0, 0, 0.1)'
                                            },
                                            content:{
                                                height:'70vh',
                                                width:'70vw',
                                                position:'absolute',
                                                top:'10vh',
                                                left:'15vw',
                                            }
                                        }} isOpen={openModal} onRequestClose={()=>setOpenModal(false)}>
                                            <h1 className='modalTitle'>ORDER {localStorage.getItem("ID")}</h1>
                                            <p>Ordered by: {localStorage.getItem("Name")}</p>
                                            <p>Deliver to: {localStorage.getItem("Address")}</p>
                                            <br></br><p>Orders:</p>
                                                {
                                                    datad.map((order, index)=>{
                                                        {total=total+order.price}
                                                        return (
                                                            <div>
                                                                <p>{index+ 1} {order.name} x{order.quant}</p>
                                                                <p>₱{order.price}.00</p>
                                                            </div>
                                                        )
                                                    })
                                                }<br/>
                                            <p>Notes: {notes}</p><br/>
                                            <p>Total: ₱{total}</p><br/>
                                            <p>Payment Method: {paymethod.toUpperCase()}</p><br></br>
                                            <p>Shipping Method: {shipmethod.toUpperCase()}</p><br></br>
                                            <p>Payment Proof:</p><br></br>
                                            {
                                                imageArr.map((pic)=>{
                                                    if(item.imagepath !== null){
                                                        if( pic.slice(85,-53) === imagepath.slice(7)){
                                                            return <img src={pic} style={{
                                                                maxWidth:'30vw'
                                                            }}/>
                                                        }else{
                                                            return null
                                                        }
                                                    }
                                                })
                                            }
                                            <br/><br/><br/><p>ORDER STATUS</p>
                                            <br/><select defaultValue={orderstatus} onChange={(e)=>setStatus(e.target.value)}>
                                                <option value="pending">PENDING</option>
                                                <option value="paid">PAID</option>
                                                <option value="delivery">FOR DELIVERY</option>
                                                <option value="completed">DELIVERED</option>
                                            </select><br/><br/>
                                            <button style={{
                                                border:'none',
                                                backgroundColor:'#FFD000',
                                                padding:'10px',
                                                width:'100px',
                                                borderRadius:'10px',
                                                cursor:'pointer'
                                            }} onClick={submitUpdate}>SAVE</button>
                                            {/* <button onClick={()=>setOpenModal(false)}>Close</button> */}
                                        </Modal>
                                        <td className='admintd'>{index+1}</td>
                                        <td className='admintd'>{item.invoice_id}</td>
                                        <td className='admintd'>{item.customername}</td>
                                        <td className='admintd'>{item.orderdate.slice(0,10)}</td>
                                        <td className='admintd'><button
                                        className='orderViewButton'
                                        onClick={()=>{
                                            setOpenModal(true);
                                            setId(item.id);
                                            localStorage.setItem("Order", JSON.stringify(dataj))
                                            localStorage.setItem("ID", item.invoice_id)
                                            localStorage.setItem("Name", item.customername);
                                            localStorage.setItem("Address", item.customeraddress)
                                            localStorage.setItem("path", item.imagepath)
                                            localStorage.setItem("status", item.status);
                                            localStorage.setItem("paymethod", item.customerpaid)
                                            localStorage.setItem("notes",item.notes)
                                            localStorage.setItem("ship", item.shipmethod)
                                        }}
                                        > 👁 </button>  &nbsp;|&nbsp;   <button onClick={()=>{deleteOrder(item.id)}} className='orderDeleteButton'> ✖ </button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}

export default OrderPage;