import React from 'react';
import Sidebar from '../components/Sidebar';
import '../css/AdminIndent.css'

function EditProduct(){
    return(
        <div className="editproduct">
            <Sidebar></Sidebar>

            <div className="pagecontent">
                {/* Page heading */}
                <h1>EDIT PRODUCT</h1>
                <hr style={{height: 1, color:'black', backgroundColor:'black'}}></hr>
                
                {/* Page body */}
                <div className="edit-content">
                    <form className="edit-product-forms">
                    <label>PRODUCT NAME</label>
                        <input 
                            type="text"
                            name="product-name"
                            required
                        />

                        <div className="flex-container-form">

                            <div className="inside-flex">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    className="price-form"
                                    name="price"
                                    required 
                                />
                            </div>
                        </div>
                        

                        <label>PRODUCT IMAGE</label>
                            <input 
                                type="file"
                                className="image-form"
                                required 
                        />

                        
                        <label>PRODUCT DESCRIPTION</label>
                        <textarea className="description"></textarea>

                        <div className="form-buttons">
                            <button className="cancel-btn">CANCEL</button>
                            <button className="save-btn">SAVE</button>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;