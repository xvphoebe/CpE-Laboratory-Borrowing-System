import React from "react";
import SCardCSS from '../css/SmallCard.module.css';

const Card = (props) =>{
    return(
        <div className={SCardCSS.container}>
            <img className={SCardCSS.cardLogo} src={require(`../../assets/icons/${props.source}.png`)}/>
            <p style={{wordBreak:'break-word'}}>{props.food}</p>
        </div>
    )
}

export default Card;