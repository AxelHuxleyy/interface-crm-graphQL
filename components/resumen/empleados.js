import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Swal from 'sweetalert2'


const BUSCAR_USUARIO = gql`

query buscarUsuario($limit: Int, $offset: Int, $texto: String!){
    buscarUsuario(texto: $texto, limit: $limit, offset: $offset){
        id
      nombre
      tienda
      administrador
      creado
      apellido
    }
  }
  `

  const ELIMINAR_EMPLEADO= gql`
mutation eliminarUsuario($id: ID!){
	eliminarUsuario(id: $id)
} 
  `

const Empleados = () => {

    const router = useRouter();



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

    const [eliminarUsuario] = useMutation(ELIMINAR_EMPLEADO)

    const pagar = id => {
        Router.push({
            pathname: "/pago/[id]",
            query: { id }
        })
    }

    const confimarEliminar = id =>{
        Swal.fire({
            title: '¿Deseas eliminar este producto?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const { data } = await eliminarUsuario({
                        variables: {
                            id

                        }
                    })
                    console.log(data)

                    Swal.fire(
                        'Correcto',
                        data.eliminarUsuario,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }

            }
        })
    }

    const historial = id =>{
        Router.push({
            pathname: "/historial/[id]",
            query: { id }
        })
    }

    return (
        <div className="w-2/3 bg-white rounded-md p-5 ml-3 shadow-lg border-l-8 border-green-400">

            <div className="flex justify-between">
                <h1>Empleados</h1>
                <Link href="/empleados">

                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded ">
                        Ver todo
                </button>
                </Link>
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
                    {loading ? "cargando..."
                        :
                        data.buscarUsuario.map((usuario, index) => (
                            <tr key={index} className="p-5 bg-blue-100 rounded border">
                                <td className="mt-2 p-3"> <p>{usuario.nombre} {usuario.apellido} </p> </td>
                                <td className="mt-2 p-3">
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3" onClick={() => historial(usuario.id)}>
                                        ver Historial
                                    </button>
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3 ml-2" onClick={() => pagar(usuario.id)}>
                                        Pagar
                                    </button>
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-3 ml-2" onClick={() => confimarEliminar(usuario.id)}>
                                        Eliminar
                                    </button>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>
        </div>
    );
}

export default Empleados;