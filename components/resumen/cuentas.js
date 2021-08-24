import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client'
const OBTENER_DEFICIT = gql`

query obtenerVentaTotalTienda($dato: Int, $cuando: String){
    obtenerVentaTotalTienda(dato: $dato, cuando: $cuando),
    obtenerTotalGastoTienda(dato: $dato, cuando: $cuando),
    totalVentaProductoStock,
    totalInvertioStock
  }
`

const Cuentas = () => {

    const [dato, setDato] = useState(2020)

    const [cuando, setCuando] = useState("mensual")

    const formatterDolar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

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


    if(data !== undefined)
    {
        var { obtenerVentaTotalTienda, obtenerTotalGastoTienda,  totalVentaProductoStock, totalInvertioStock} = data
    }else{
        obtenerTotalGastoTienda= 0
        obtenerVentaTotalTienda = 0
    }

    return (
        <div  className="h-auto">
            <h1>cuentas</h1>
            <p className="text-sm pt-3">datos de este mes</p>
            <div className="bg-transparent flex justify-center p-3 w-full p-5 mb-3">
                <div className="xl:w-1/3 lg:1/3 bg-white rounded-md p-3 m-1 shadow-xl flex  flex-row justify-between px-5">
                    
                    <div className="flex flex-col">
                        <h1 className=" text-xl text-gray-600">Ventas</h1>
    <h1 className="text-2xl text-gray-800 mt-2">{formatterDolar.format(obtenerVentaTotalTienda)}</h1>
                    </div>
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white" className=" bg-green-600 rounded-full w-20 h-20 p-2"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>

                </div>
                <div className="xl:w-1/3 lg:1/3 bg-white rounded-md p-3 m-1 shadow-xl flex  flex-row justify-between px-5">
                    
                    <div className="flex flex-col">
                        <h1 className=" text-xl text-gray-600">Gastos</h1>
    <h1 className="text-2xl text-gray-800 mt-2">{ formatterDolar.format(obtenerTotalGastoTienda)}</h1>
                    </div>
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white" className=" bg-red-600 rounded-full w-20 h-20 p-2"><path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>

                </div>
                <div className="xl:w-1/3 lg:1/3 bg-blue-400 rounded-md p-3 m-1 shadow-xl flex  flex-row justify-between px-5">
                    
                    <div className="flex flex-col">
                        <h1 className=" text-xl text-white">Total</h1>
    <h1 className="text-3xl text-white mt-2">{formatterDolar.format(obtenerVentaTotalTienda- obtenerTotalGastoTienda)}</h1>
                    </div>
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentcolor" className=" bg-white rounded-full w-20 h-20 p-2"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
            </div>

            <div className="bg-transparent flex justify-center p-3 w-full p-5 mb-3">
                <div className="xl:w-1/3 lg:1/3 bg-white rounded-md p-3 m-1 shadow-xl flex  flex-row justify-between px-5">
                    
                    <div className="flex flex-col">
                        <h1 className=" text-xl text-gray-600">valor inventario precio de compra </h1>
    <h1 className="text-2xl text-gray-800 mt-2">{formatterDolar.format(totalInvertioStock)}</h1>
                    </div>
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white" className=" bg-blue-500 rounded-full w-20 h-20 p-2"><path  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>

                </div>
                <div className="xl:w-1/3 lg:1/3 bg-white rounded-md p-3 m-1 shadow-xl flex  flex-row justify-between px-5">
                    
                    <div className="flex flex-col">
                        <h1 className=" text-xl text-gray-600">Valor inventario precio de venta</h1>
    <h1 className="text-2xl text-gray-800 mt-2">{formatterDolar.format(totalVentaProductoStock)}</h1>
                    </div>
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white" className=" bg-blue-800 rounded-full w-20 h-20 p-2"><path  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>

                </div>
            </div>
            
        </div >

    );
}
export default Cuentas;