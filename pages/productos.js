import Layout from '../components/layout'
import Producto from '../components/producto'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import React, { useState } from 'react';

const OBTENER_PRODUCTOS = gql`

query buscarProducto ($texto : String!, $limit: Int, $offset:Int){
    buscarProducto(texto: $texto, limit: $limit, offset: $offset){
      id
      precio
      nombre
      existencia
    }
    totalProductos
    obtenerUsuario{
        administrador
    }

  }

`



const Productos = () => {
    const [product, setproduct] = useState("")
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(0)

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS, {
        variables: {
            texto: product,
            limit,
            offset: limit * page
        }
    })

    return (
        <div>
            <Layout>
                <div className="bg-white p-3 rounded-md shadow">

                    <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

                    <div className="flex justify-center flex-row">

                        <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 "
                            type="email" placeholder="Buscar" onChange={e => setproduct(e.target.value)} value={product} />


                    </div>

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


                    <div className="overflow-x-scroll">
                        {loading ? <p>Cargando...</p> : error ? <p>Ocurrio un error</p> : !data || !data.buscarCliente == undefined ? salir() :

                            <table className="table-auto shadow-md mt-1 w-full w-lg">
                                <thead className="bg-gray-800 ">
                                    <tr className="text-white">
                                        <th className="w-1/5 py-2">Nombre</th>
                                        <th className="w-1/5 py-2">Precio</th>
                                        <th className="w-1/5 py-2">Existencia</th>
                                        {data.obtenerUsuario.administrador ?
                                            <>

                                                <th className="w-1/5 py-2">Eliminar</th>
                                                <th className="w-1/5 py-2">Editar</th>
                                            </> : null
                                        }

                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {data.buscarProducto.map(producto => (
                                        <Producto

                                            key={producto.id}
                                            producto={producto}
                                            administrador={data.obtenerUsuario.administrador}
                                        />
                                    ))

                                    }

                                </tbody>
                            </table>
                        }



                    </div>
                    <div className="flex justify-end w-full flex-row">
                        <div className="flex justify-start bg-gray-200">
                            {page > 0 ? <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 cursor-pointer" onClick={() => setPage(page - 1)}>&laquo;</div> : null}

                            {loading ? "cargnado..." : page != Math.ceil(data.totalProductos / limit) - 1 ? <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 cursor-pointer" onClick={() => setPage(page + 1)} >&raquo;	</div> : null}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>

    )
}

export default Productos