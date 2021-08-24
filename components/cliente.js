import React from 'react'
import Swal from 'sweetalert2'
import {gql, useMutation} from '@apollo/client'
import Router from 'next/router'

const ELIMINAR_CLIENTE= gql`

    mutation eliminarCliente($id: ID!){
        eliminarCliente(id:$id)
    }


`
const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`


const Cliente = ({cliente, administrador}) =>{

    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,{
        update(cache){
            //obtener una copia del objeto de cache
            const { obtenerClientesVendedor } =cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            //RESCRIBIR CACHE
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data:{
                    obtenerClientesVendedor : obtenerClientesVendedor.filter( clienteActual  => clienteActual.id !== id )
                }
            })
        }
    });

    console.log(administrador)

    const {id, nombre, apellido, empresa, email} = cliente

    //eliminar cliente 

    const ConfirmarEliminarCliente = (id) =>{
        Swal.fire({
            title: '¿Deseas eliminar este cliente?',
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
                    //elimninar por ID  
                    const { data } = await eliminarCliente({
                        variables:{
                            id
                        }
                    });

                    //mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarCliente,
                        'success'
                      )
                } catch (error) {
                    console.log(error)
                }
              
            }
          })
    }
    
    const EditarCliente = () =>{
        Router.push({
            pathname: "/editarcliente/[id]",
            query: {id}
        })
    }
    return(

        <tr>
              <td className="border px-4 py-2 ">{nombre}  {apellido}</td>
              <td className="border px-4 py-2 ">{empresa}</td>
              <td className="border px-4 py-2 ">{email}</td>
              {
                  administrador ? 
                  <>

                  <td className="border px-4 py-2 ">
                  <button type="button" style={{background: "#0f4c75"}} className="flex justify-center items-center rounded py-2 px-4 w-full text-white text-xs uppercase font-bold" onClick={() => ConfirmarEliminarCliente(id)}>
                      Eliminar
                      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2 ">
                  <button type="button" className="flex justify-center items-center bg-green-800 rounded py-2 px-4 w-full text-white text-xs uppercase font-bold" onClick={() => EditarCliente(id)}>
                      Editar
                      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
                  </>
                :null
              }
              
            </tr>

     )
}

export default Cliente