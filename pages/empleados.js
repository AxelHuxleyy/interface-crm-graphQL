import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react';
import Layout from '../components/layout';
const BUSCAR_USUARIO = gql`

query buscarUsuario($limit: Int, $offset: Int, $texto: String!){
    buscarUsuario(texto: $texto, limit: $limit, offset: $offset){
        nombre
        tienda
        administrador
        creado
        apellido
        email
    }
  }
  `

const Empleados = () => {


    const [name, setName] = useState("")
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(0)

    const [limit, setLimit] = useState(5)

   
    const { data, loading, error } = useQuery(BUSCAR_USUARIO, {
        variables: {
            texto: name,
            limit,
            offset: limit * page
        }
    })


    
    
    return (
        <Layout >


        <div className="w-full bg-white rounded-md p-5 ml-3 shadow-lg border-l-8 border-green-400">
            
            <div className="flex justify-between">
                <h1>Empleados</h1>
            </div>

            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 "
                            type="email" placeholder="Buscar" onChange={e => setName(e.target.value)} value={name} />

                    <div className="flex justify-end pr-3 mt-4 items-center">
                        <p className="text-gray-600 pr-1">No. de resultados: </p>
                        <select
                            className=" appearance-none bg-white   border border-gray-400  rounded-lg text-gray-500 px-3 text-center rounded focus:outline-none focus:bg-white py-3 shadow-md focus:border-gray-500  text-xs font-bold"
                            value={limit}
                            onChange={e => setLimit(Number(e.target.value))}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">20</option>

                        </select>
                    </div>

            <table className="table-auto shadow-md mt-10 w-full w-lg rounded-md">
                <thead className="bg-gray-300 ">
                    <tr className="text-white">
                        <th className="w-1/5 py-2 text-gray-700">Empleados</th>
                        <th className="w-1/5 py-2 text-gray-700">
                            Correo
                        </th>
                        <th className="w-1/5 py-2 text-gray-700">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {loading ? "cargando..."
                    :
                    data.buscarUsuario.map((usuario, index) => (
                        <tr key={index} className="p-5 bg-blue-100 rounded border">
                        <td className="mt-2 p-3"> <p>{usuario.nombre} {usuario.apellido} </p> </td>
                        <td className="mt-2 p-3"> <p>{usuario.email}  </p> </td>

                        <td className="mt-2 p-3">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3">
                                Ver Historial
                            </button>
                        </td>

                    </tr>
                    ))
                    }
                    
                </tbody>
                
            </table>
            
        </div>
        </Layout>
    );
}

export default Empleados;