import './Card.scss'
import React from 'react'
import backImage from '../../public/img/back-image.jpg';

function Card(props){

    const handleClick = () => {
        if(!props.disabled){
            props.handleSeleccion(props.carta)
        }
    }

    return(
        <div className='card'>
            <div className={props.flipped ? "flipped" : ""}>
                <img className='front' src={props.carta.src}/>
                <img className='back'
                src={backImage}
                onClick={handleClick}/>
            </div>
        </div>
    );
}

export default Card