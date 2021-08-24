import React, { useEffect, useState } from 'react';
import Layout from '../components/layout'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Grafica from '../components/gastos/graficas'


const OBTENER_DEFICIT = gql`

query obtenerVentaTotalTienda($dato: Int, $cuando: String){
    obtenerVentaTotalTienda(dato: $dato, cuando: $cuando),
    obtenerTotalGastoTienda(dato: $dato, cuando: $cuando)
  }
`




const Gasto = () => {

    const [dato, setDato] = useState(2020)

    const [cuando, setCuando] = useState("anual")

    const router = useRouter();
    //consulta de apollo

    const { data, loading, error, startPolling, stopPolling } = useQuery(OBTENER_DEFICIT, {
        variables:{
            cuando,
            
        }
    })

    useEffect(() => {
        startPolling(1000)

        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])


    console.log(data)
    console.log(loading)
    console.log(error)

    if (loading) return "cargando..."


   
        var { obtenerVentaTotalTienda, obtenerTotalGastoTienda } = data
   
    
    

    

    return (


        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Gastos</h1>
            <h2 className="text-2x1 text-gray-700 font-light mt-3">Filtrar por este:</h2>
            <div className="inline-flex">
                <button className={`${cuando == "dia" ? `bg-gray-400`: `bg-gray-300`} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l`}
                    onClick={() => setCuando("dia")}
                >
                    Dia
                    </button>
                    <button className={`${cuando == "semanal" ? `bg-gray-400`: `bg-gray-300`} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l`}
                    onClick={() => setCuando("semanal")}

                >
                    Semana
                    </button>
                    <button className={`${cuando == "mensual" ? `bg-gray-400`: `bg-gray-300`} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l`}
                    onClick={() => setCuando("mensual")}

                >
                    Mes
                    </button>
                    <button className={`${cuando == "anual" ? `bg-gray-400`: `bg-gray-300`} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l`}
                    onClick={() => setCuando("anual")}
                >
                    Año
                    </button>
            </div>
            {data !== undefined ? 
            
        
        <>
            <div className="flex justify-center mt-5 ">
            <div className="inline-flex  w-full justify-center">
                <div className="bg-green-600 rounded-lg h-56 w-auto m-5">
                    <h1 className="text-2xl text-center font-light mt-2 text-white">Ventas</h1>

                    <p className="text-6xl text-center font-light mt-2 mx-3 text-white">${obtenerVentaTotalTienda}</p>


                </div>
                <div className="bg-red-800 rounded-lg h-56 w-auto m-5">
                    <h1 className="text-2xl text-center font-light mt-2 text-white"></h1>
                    <h1 className="text-2xl text-center font-light mt-2 text-white">Gastos</h1>

                    <p className="text-6xl text-center font-light mt-2 mx-3 text-white">${obtenerTotalGastoTienda}</p>


                </div>
                <div className={(obtenerVentaTotalTienda - obtenerTotalGastoTienda )> 0 ?`bg-yellow-400 rounded-lg h-56 w-auto m-5`: `bg-red-800 rounded-lg h-56 w-auto m-5`}>

                    <h1 className="text-2xl text-center font-light mt-2 text-white">Total</h1>

                    <p className="text-6xl text-center font-light mt-2 mx-3 text-white">${obtenerVentaTotalTienda - obtenerTotalGastoTienda}</p>

                </div>
            </div>
        </div>
        <Grafica cuando={cuando}/>
        </>
        
        
        : <h1>No hay datos</h1> }
            

        </Layout>

    );
}

export default Gasto;