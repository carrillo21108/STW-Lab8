import './Card.scss'
import React from 'react'

function Card(props){

    const handleClick = () => {
        props.handleSeleccion(props.carta)
    }

    return(
        <div className='card'>
            <div className={props.flipped ? "flipped" : ""}>
                <img className='front' src={props.carta.src}/>
                <img className='back'
                src="/img/back-image.jpg"
                onClick={handleClick}/>
            </div>
        </div>
    );
}

export default Card