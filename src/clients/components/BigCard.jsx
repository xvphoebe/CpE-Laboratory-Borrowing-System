import React from "react";
import BigCardCss from '../css/BigCard.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineShoppingCart } from "react-icons/ai";
import imageExists from 'image-exists';



const Card = (props) =>{
    const [count, setCount] = React.useState(0);
    const [cart,setCart] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [added, setAdded] = React.useState(false);
    const fallBackSrc = require('../../assets/images/bag.png');
    const [error, setError] = React.useState(false);
    const notify = () => toast.success(`${props.food} has been added to your cart.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        draggable: true,
        progress: undefined,
    });

    const tryRequire = (path) => {
        try{
            return require(`../../assets/images/${props.folder}/${props.food}.jpg`)
        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(()=>{
        console.log(total);
    })


    // galing local storage, pass to post, generate nalang galing db
    const handleClick = () =>{
        if(added === true){
            notify()
        }
        setCount(count+1)
        console.log(props.food, count+1);
        setAdded(true);
        localStorage.setItem(`${props.food}`, count)
            // cart.map(items=>{
            //     if(total===0){
            //         localStorage.setItem("Total", items.price)
            //     }
            //     else{
            //         localStorage.setItem("Total", total+items.price)
            //     }              
            // })
            setCart([
                ...cart,
                {
                    qty:count+1,
                    name:props.food,
                }
            ]);
    }

    

    return(
        <div className={BigCardCss.bigCard} style={props.styles}>
            {
                tryRequire(`../../assets/images/${props.folder}/${props.food}.jpg`) ? 
                <img className={BigCardCss.loadedImage} src={require(`../../assets/images/${props.folder}/${props.food}.jpg`)} alt={props.food}/>
                :
                <img className={BigCardCss.errorImage} src={fallBackSrc}/>
            }
            <div className={BigCardCss.bottom}>
                <div className={BigCardCss.textContainer}>
                    <p className={BigCardCss.foodText}>{props.food}</p>
                    <p className={BigCardCss.priceText}>{props.price} left</p>
                    {/* <p className={BigCardCss.subText}>lorem ipsum</p> */}
                </div>
                {
                    added === true?
                        <button className={BigCardCss.addButton} onClick={handleClick}>+</button>
                    :(
                        <button className={BigCardCss.addButton} onClick={handleClick}><AiOutlineShoppingCart/></button>
                    )
                }
                    <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="dark"
                    progressStyle={{
                        backgroundColor:'#FDD000'
                    }}
                    
                    />
            </div>
        </div>
    )
}

export default Card;