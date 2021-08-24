import Layout from '../components/layout'
import Cliente from '../components/cliente'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from "next/link"
import Swal from 'sweetalert2'
import React, { useState } from 'react';

const BUSCAR_CLIENTE = gql`
query buscarCliente($texto: String!, $limit: Int, $offset: Int){
    buscarCliente(texto: $texto, limit:$limit, offset: $offset){
      nombre
      id
      apellido
      email
      empresa
    }
    totalClientes
    obtenerUsuario{
        administrador
    }
  }
`
const Index = () => {
    const [cliente, setCliente] = useState("")
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(0)


    const router = useRouter();
    //consulta de apollo

    const { data, loading, error } = useQuery(BUSCAR_CLIENTE, {
        variables: {
            texto: cliente,
            limit,
            offset: limit * page
        }
    })





    const login = () => {
        if (!data || !data.buscarCliente == undefined) { //checa si se obtienen los datos o si tiene el token
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No estas logeado!',
            })
            router.push('/login')
            setTimeout(() => {
                return null
    
            }, 1000);
        }
        else {
            return data.buscarCliente.map(cliente => (
                <Cliente

                    key={cliente.id}
                    cliente={cliente}
                    administrador={data.obtenerUsuario.administrador}
                />
            ))
        }
    }
    const salir = () =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No estas logeado!',
        })
        router.push('/login')
        setTimeout(() => {
            return null

        }, 1000);
    }

    const calcularPagina = () => {
        if (!data || !data.buscarCliente == undefined) { //checa si se obtienen los datos o si tiene el token
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No estas logeado!',
            })
            router.push('/login')
            setTimeout(() => {
                return null

            }, 1000);
        }
        else {
            return page != Math.ceil(data.totalClientes / limit) - 1 ? <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 cursor-pointer" onClick={() => setPage(page + 1)} >&raquo;	</div> : null
        }
    }

    if(loading) "cargando"
    console.log(data)
    return (
        <div>
            <Layout>
                <div className="bg-white p-3 rounded-md shadow  w-full items-center">

                        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
                        <Link href="/nuevoCliente">
                            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">Nuevo cliente</a>
                        </Link>
                        <div className="flex justify-center flex-row">

                            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 "
                                type="email" placeholder="Buscar" onChange={e => setCliente(e.target.value)} value={cliente} />
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
                        {
                            loading ? <p>cargando...</p> : error ?  salir() :  !data || !data.buscarCliente == undefined ? salir() : 

                            <table className="table-auto shadow-md  w-full w-lg mt-1">
                            <thead className="bg-gray-200">
                                <tr className="text-gray-900">
                                    <th className="w-1/5 py-2">Nombre</th>
                                    <th className="w-1/5 py-2">Empresa</th>
                                    <th className="w-1/5 py-2">Email</th>
                                    {loading ? <P>cargando</P> : data.obtenerUsuario.administrador ? <>
                                        <th className="w-1/5 py-2">Eliminar</th>
                                        <th className="w-1/5 py-2">Editar</th> 
                                        </>
                                    : null }
                                    

                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    login()

                                }

                            </tbody>
                        </table>

                        }
                        
                    </div>
                    <div className="flex justify-end w-full flex-row">
                        <div className="flex justify-start bg-gray-200">
                            {page > 0 ? <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 cursor-pointer" onClick={() => setPage(page - 1)}>&laquo;</div> : null}

                            {loading ? "cargando..." : calcularPagina()}
                        </div>
                    </div>
                </div>


            </Layout>
        </div>

    )
}

export default Index