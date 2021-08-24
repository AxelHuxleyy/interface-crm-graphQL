import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react';
const BUSCAR_USUARIO = gql`

query buscarUsuario($limit: Int, $offset: Int, $texto: String!){
    buscarUsuario(texto: $texto, limit: $limit, offset: $offset){
      nombre
      tienda
      administrador
      creado
      apellido
    }
  }
  `

const Empleados = () => {


    const [name, setName] = useState("")
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(0)

    const [limit, setLimit] = useState(0)

   
    const { data, loading, error } = useQuery(BUSCAR_USUARIO, {
        variables: {
            texto: name,
            limit,
            offset: limit * page
        }
    })
    if (loading) return "cargando..."
    console.log(data)
    console.log(error)
    return (
        <div className="w-2/3 bg-white rounded-md p-5 ml-3 shadow">
            
            <div className="flex justify-between">
                <h1>Empleados</h1>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded ">
                                Ver todo
                </button>
            </div>

            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 "
                            type="email" placeholder="Buscar" onChange={e => setName(e.target.value)} value={name} />

            <table className="table-auto shadow-md mt-10 w-full w-lg rounded-md">
                <thead className="bg-gray-300 ">
                    <tr className="text-white">
                        <th className="w-1/5 py-2 text-gray-700">Empleados</th>
                        <th className="w-1/5 py-2 text-gray-700">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.buscarUsuario.map((usuario, index) => (
                        <tr key={index} className="p-5 bg-blue-100 rounded border">
                        <td className="mt-2 p-3"> <p>{usuario.nombre} {usuario.apellido} </p> </td>
                        <td className="mt-2 p-3">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3">
                                ver Historial
                            </button>
                            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3">
                                Pagar
                            </button>
                        </td>

                    </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    );
}

export default Empleados;