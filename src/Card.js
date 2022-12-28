import React from "react";
import './Card.css'
import CardContainer from "./CardContainer";

function Card(props) {
    return( 
        <img src={props.src} className='card' />
    )
}


export default Card;
