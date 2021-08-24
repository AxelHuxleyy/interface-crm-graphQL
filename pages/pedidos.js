import React, { useState } from 'react';
import Layout from '../components/layout'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import Pedido from '../components/Pedidos/Pedido'
import Swal from 'sweetalert2'

const OBTENER_PEDIDOS = gql`
query buscarPedido($limit: Int, $offset: Int){
  buscarPedido(limit: $limit, offset: $offset){
    id
    pedido {
      id
      cantidad
      nombre
    }
    cliente{
      id
      nombre
      apellido
      email
      telefono
    }
    vendedor
    total
    estado
  },
  totalPedidos
  obtenerUsuario{
    administrador
}
}

`

const Pedidos = () => {
  const [limit, setLimit] = useState(5)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(0)
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS, {
    variables: {
      limit,
      offset: limit * page
    }
  })


  const calcularPagina = () => {
    if ( !data||  !data.buscarPedido == undefined ) { //checa si se obtienen los datos o si tiene el token
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
        return page != Math.ceil(data.totalPedidos / limit) - 1 ? <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 cursor-pointer" onClick={() => setPage(page + 1)} >&raquo;	</div> : null
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

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
        <Link href="/nuevopedido">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo pedido</a>
        </Link>
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
        {loading ? <p>Cargando...</p> : error ? <p>Hay un error imposible mostrar resultados</p> : !data || data.buscarPedido == undefined ? salir(): data.buscarPedido.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos aun </p>
        ) : (
            data.buscarPedido.map(pedido => (
              <Pedido
                key={pedido.id}
                pedido={pedido}
                administrador={data.obtenerUsuario.administrador}
                />
            ))
          )}
        <div className="flex justify-end w-full flex-row">
          <div className="flex justify-start bg-gray-200">
            {page > 0 ? <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 cursor-pointer" onClick={() => setPage(page - 1)}>&laquo;</div> : null}

            {loading ? "cargando..." : calcularPagina()}
          </div>
        </div>
      </Layout>
    </div>

  )
}

export default Pedidos