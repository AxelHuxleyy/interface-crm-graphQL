import React, { Component } from 'react'
import Productos from '../pages/productos'
import Swal from 'sweetalert2'
import { gql, useMutation } from "@apollo/client"
import Router from 'next/router'

const ELIMNAR_PRODUCTO = gql`

    mutation eliminarProducto($id: ID!){
        eliminarProducto(id: $id)
    }


`
const OBTENER_PRODUCTOS = gql`

  query obtenerProductos{
    obtenerProductos{
      id
      nombre
      precio
      existencia
    }
  }

`
const Producto = ({ producto }) => {



    const { id, nombre, precio, existencia } = producto

    return (
        <tr>
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">$ {precio}</td>
            <td className="border px-4 py-2">{existencia}</td>
            <td className="border px-4 py-2">

                <button type="button" className="flex justify-center items-center bg-red-800 rounded py-2 px-4 w-full text-white text-xs uppercase font-bold"
                    onClick={() => ConfirmarEliminarProducto()}
                >
                    Eliminar
                      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>

            </td>
            <td className="border px-4 py-2">


                <button type="button" className="flex justify-center items-center bg-green-800 rounded py-2 px-4 w-full text-white text-xs uppercase font-bold" onClick={() => EditarProducto()}>
                    Editar
                      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
            </td>


        </tr>
    )
}


export default Producto