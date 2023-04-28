import './App.scss'
import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import hasbulla1 from '../public/img/hasbulla-1.png'
import hasbulla2 from '../public/img/hasbulla-2.png'
import hasbulla3 from '../public/img/hasbulla-3.png'
import hasbulla4 from '../public/img/hasbulla-4.png'
import hasbulla5 from '../public/img/hasbulla-5.png'
import hasbulla6 from '../public/img/hasbulla-6.png'
import hasbulla7 from '../public/img/hasbulla-7.png'
import hasbulla8 from '../public/img/hasbulla-8.png'

const imagenes = [
    {"src":hasbulla1, matched:false},
    {"src":hasbulla2, matched:false},
    {"src":hasbulla3, matched:false},
    {"src":hasbulla4, matched:false},
    {"src":hasbulla5, matched:false},
    {"src":hasbulla6, matched:false},
    {"src":hasbulla7, matched:false},
    {"src":hasbulla8, matched:false}
]

function App(){

    const [cartas,setCartas] = useState([])
    const [intentos,setIntentos] = useState(0)
    const [seleccionUno,setSeleccionUno] = useState(null)
    const [seleccionDos,setSeleccionDos] = useState(null)
    const [desactivado,setDesactivado] = useState(false)
    const [completados,setCompletados] = useState(0)

    const reordenarCartas = () =>{
        const cartasReordenadas = [...imagenes,...imagenes]
            .sort(()=> Math.random()-0.5)
            .map((carta) => ({...carta, id:Math.random()}));

        limpiarSelecciones()
        setCartas(cartasReordenadas)
        setIntentos(0)
        setCompletados(0)
    }

    const handleSeleccion = (carta) =>{
        seleccionUno ? setSeleccionDos(carta) : setSeleccionUno(carta)   
    }

    useEffect(()=>{
        if(seleccionUno && seleccionDos){
            setDesactivado(true)
            if(seleccionUno.src === seleccionDos.src){
                setCompletados(completados+1)
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
                setTimeout(()=>resetTurno(),1000)
            }
        }
    },[seleccionDos])

    const limpiarSelecciones = () => {
        setSeleccionUno(null)
        setSeleccionDos(null)
    }

    const resetTurno = () => {
        limpiarSelecciones()    
        setIntentos(intentos+1)
        setDesactivado(false)
    }

    useEffect(()=>{
        reordenarCartas()
    },[])

    useEffect(()=>{
        if(completados === imagenes.length){
            setTimeout(()=>{
                alert('¡Juego completado!\nIntentos totales: '+intentos)
                reordenarCartas()
            },1000)
        }
    },[completados])

    return (
        <div className="App">
            <h1>Memoria</h1>
            <p>Intentos: {intentos}</p>
            <button onClick={reordenarCartas}>Nuevo juego</button>

            <div className='card-grid'>
                {cartas.map(carta => (
                    <Card
                    key={carta.id}
                    carta={carta}
                    handleSeleccion={handleSeleccion}
                    flipped={carta === seleccionUno || carta === seleccionDos || carta.matched}
                    disabled={desactivado}/>
                ))}
            </div>
        </div>
    );
}

export default App