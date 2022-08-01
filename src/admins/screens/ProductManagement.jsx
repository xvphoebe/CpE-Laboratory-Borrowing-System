import React from 'react';
import Sidebar from '../components/Sidebar';
import '../css/AdminIndent.css';
import { Link } from "react-router-dom";
// import ProductTable from '../components/product-table';
import axios from 'axios';
import Modal from 'react-modal'
import Swal from 'sweetalert2';

function ProductManagement(){
    const [arr,setArr] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [id, setID] = React.useState(0);
    const [folder, setFolder] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [newPrice, setNewPrice] = React.useState(0);
    const [date, setDate] = React.useState("")

  React.useEffect(() => {
    getDrinks();
    setNewPrice(localStorage.getItem("price"));
    setNewName(localStorage.getItem("product"));
    setFolder(localStorage.getItem("folder"));
    setID(localStorage.getItem('id'));
    setDate(localStorage.getItem('date'))
    console.log(`api/admin/update${folder}`)
  }, [openModal]);

  const getDrinks = () =>{  
      axios.get("https://ordering-system-database.herokuapp.com/api/equipments/get")
          .then((response) => {
                setArr(response.data);
      });
  }

  const deleteProduct = (id, folder) => {
    console.log(id, folder)
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
            Swal.fire({
                title: 'Verifying...',
                text: 'Please wait.',
                timer: 2000,
                didOpen: () => {
                  Swal.showLoading();
                  if(folder === 'handcrafted' || folder === 'blendedsmoothies' || folder === 'hotbeverages'){
                    axios.delete(`https://ordering-system-database.herokuapp.com/api/admin/drinksdelete/${id}`)
                    .then((response)=>{
                        setArr(arr.filter((val)=>{
                            return val.id != id
                        }))
                    })
                    }else{
                    axios.delete(`https://ordering-system-database.herokuapp.com/api/admin/${folder}delete/${id}`)
                    .then((response)=>{
                        setArr(arr.filter((val)=>{
                            return val.id != id
                        }))
                    })
                    }
                }
            }).then(()=>{
                Swal.fire({
                    title: 'Success',
                    text: 'Item Deleted',
                    icon:'success',
                    customClass:{
                        icon:'swalertIcon'
                    }
                })
            })
        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   )
        }
    })
    }

  const updateProduct = () => {
      console.log(newName, newPrice, folder);
      if((parseInt(localStorage.getItem("price")) == newPrice) && (localStorage.getItem("product") == newName)){
        Swal.fire({
            title: 'Product Edit Failed',
            text: 'No changes were made',
            icon: 'warning',
            confirmButtonText: 'Try Again',
            customClass:{
                icon: 'swalertIcon'
            }
        })
      }else{
        Swal.fire({
            title: 'Edit Successful',
            text: 'Changes were made successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass:{
                icon: 'swalertIcon'
            }
        })
        if(folder === "blendedsmoothies" || folder === "handcrafted" || folder === "hotbeverages"){
            axios.put(`https://ordering-system-database.herokuapp.com/api/admin/updatedrinks`,{
            id : id,
            price: newPrice,
            name: newName
            }).then((response)=>{
                setArr(arr.map((val)=>{
                    return val.id == id? {id: id, menuName: newName, folder: folder, price: newPrice, date: date} : val
                }))
                console.log(response)
            })
        }else{
            axios.put(`https://ordering-system-database.herokuapp.com/api/admin/update${folder}`,{
          id : id,
          price: newPrice,
          name: newName
        }).then((response)=>{
            setArr(arr.map((val)=>{
                return val.id == id? {id: id, menuName: newName, folder: folder, price: newPrice, date: date} : val
            }))
            console.log(response)
        })
        }
        setOpenModal(false)
      }
      
  }

    return(
        <div className="productmanagement">
            <Sidebar></Sidebar>
            
            <div className="pagecontent">
                <div className="flex-container-header">
                    <h1>ITEM MANAGEMENT</h1>
                    <Link to="/admin/addproduct"><button className="add-btn">ADD PRODUCT</button></Link>
                </div>
                <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
            
            <div className="product-table">
                {/* <ProductTable></ProductTable> */}
                <table className='admintables'>
                    <thead>
                        <tr>
                            <th className='adminth'>#</th>
                            <th className='adminth'>Product Name</th>
                            <th className='adminth'>Quantity</th>
                            <th className='adminth'>Date Created</th>
                            <th className='adminth'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr.map((item,index) =>{
                                return(
                                    <tr>
                                        <Modal style={{
                                            overlay:{
                                                backgroundColor:'rgba(0, 0, 0, 0.02)'
                                            },
                                            content:{
                                                height:'50vh',
                                                width:'50vw',
                                                position:'absolute',
                                                top:'20vh',
                                                left:'25vw',
                                                display:'flex',
                                                flexDirection:'column',
                                                alignItems:'center',
                                                justifyContent:"space-evenly"
                                            }
                                        }} isOpen={openModal} onRequestClose={()=>setOpenModal(false)}>
                                            <h1 className='modalTitle'>Edit Product</h1>
                                            <p className='modalP'>New Product Name</p>
                                            <input
                                                className='modalInput'
                                                type="text"
                                                name="newname"
                                                onChange={(e)=>setNewName(e.target.value)}
                                            /><br></br>
                                            <p className='modalP'>Quantity</p>
                                            <input
                                                className='modalInput'
                                                type="number"
                                                name="newname"
                                                onChange={(e)=>setNewPrice(e.target.value)}
                                            /><br></br>
                                            <button className='modalSubmitButton' onClick={updateProduct}>Submit</button>
                                        </Modal>
                                        <td className='admintd'>{index+1}</td>
                                        <td className='admintd'>{item.menuName}</td>
                                        <td className='admintd'>{item.quantity}</td>
                                        <td className='admintd'>{item.date.slice(0,10)}</td>
                                        <td className='admintd'><button className='editProductButton' onClick={()=>{
                                            setOpenModal(true);
                                            localStorage.setItem("product", item.menuName);
                                            localStorage.setItem('price', item.quantity);
                                            localStorage.setItem('folder', item.folder);
                                            localStorage.setItem('id', item.id);
                                            localStorage.setItem('date',item.date);
                                        }}> ✒ </button>  
                                        <button className='orderDeleteButton' onClick={()=>{deleteProduct(item.id, item.folder)}}> 🗑 </button>
                                        </td>
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

export default ProductManagement;