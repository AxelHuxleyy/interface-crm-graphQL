import React from 'react';
import { gql, useQuery } from '@apollo/client'


const OBTENER_MENSAJES = gql`

query obtenerMensajes{
    obtenerMensajes
  }
`
const Mebsajes = () => {
    const { data, loading, error } = useQuery(OBTENER_MENSAJES)

    if (loading) return "cargando..."

    console.log(data)
    console.log(error)
    return (  
        <div className="bg-white p-3 rounded-md shadow-lg w-1/3 p-5 border-l-8 border-yellow-400 h-auto">


                    <h1>Mensajes</h1>

                    <table className="table-auto shadow-md mt-10 w-full w-lg rounded-md">
                        <thead className="bg-gray-300 ">
                            <tr className="text-white">
                                <th className="w-1/5 py-2 text-gray-700">Mensajes</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.obtenerMensajes.length == 0 ? <tr> <td> sin mensajes</td>  </tr>
                                : data.obtenerMensajes.map((mensaje, index) => (
                                    <tr key={index} className="p-5 bg-blue-100 rounded border">
                                        <td className="mt-2 p-3">{mensaje}</td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>


                    <div className="flex justify-between">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3">
                            Realizar nuevo pedido
                            </button>
                        {data.obtenerMensajes.length == 10 ?
                            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3">
                                ver registro completo
                            </button> : null}

                    </div>



                </div>
    );
}
 
export default Mebsajes;