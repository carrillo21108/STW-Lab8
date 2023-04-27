import './App.scss'
import React, { useEffect, useState } from 'react'
import Card from './components/Card'

const imagenes = [
    {"src":"/img/hasbulla-1.png", matched:false},
    {"src":"/img/hasbulla-2.png", matched:false},
    {"src":"/img/hasbulla-3.png", matched:false},
    {"src":"/img/hasbulla-4.png", matched:false},
    {"src":"/img/hasbulla-5.png", matched:false},
    {"src":"/img/hasbulla-6.png", matched:false}
]

function App(){

    const [cartas,setCartas] = useState([])
    const [intentos,setIntentos] = useState(0)
    const [seleccionUno,setSeleccionUno] = useState(null)
    const [seleccionDos,setSeleccionDos] = useState(null)

    const reordenarCartas = () =>{
        const cartasReordenadas = [...imagenes,...imagenes]
            .sort(()=> Math.random()-0.5)
            .map((carta) => ({...carta, id:Math.random()}));

        setCartas(cartasReordenadas)
        setIntentos(0)
    }

    const handleSeleccion = (carta) =>{
        seleccionUno ? setSeleccionDos(carta) : setSeleccionUno(carta)   
    }

    useEffect(()=>{
        if(seleccionUno && seleccionDos){
            if(seleccionUno.src === seleccionDos.src){
                setCartas(cartas => {
                    return cartas.map(carta =>{
                        if(carta.src === seleccionUno.src){
                            return {...carta,matched:true}
                        }else{
                            return {...carta}
                        }
                    })
                })
                resetTurno()
            }else{
                resetTurno()
            }
        }
    },[seleccionDos])

    console.log(cartas)

    const resetTurno = () => {
        setSeleccionUno(null)
        setSeleccionDos(null)
        setIntentos(intentos+1)
    }

    return (
        <div className="App">
            <h1>Memoria</h1>
            <button onClick={reordenarCartas}>Nuevo juego</button>

            <div className='card-grid'>
                {cartas.map(carta => (
                    <Card
                    key={carta.id}
                    carta={carta}
                    handleSeleccion={handleSeleccion}
                    flipped={carta === seleccionUno || carta === seleccionDos || carta.matched}/>
                ))}
            </div>
        </div>
    );
}

export default App