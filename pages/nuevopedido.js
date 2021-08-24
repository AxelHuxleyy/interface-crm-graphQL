import React, { useContext, useState } from 'react'
import Layout from '../components/layout'
import AsignarCliente from '../components/Pedidos/AsignarCliente'
import AsignarProductos from '../components/Pedidos/AsignarProductos'
import ResumenPedido from '../components/Pedidos/ResumenPedido'
import Descuento from '../components/Pedidos/Descuento'
import Anticipo from '../components/Pedidos/Anticipo'
import Total from '../components/Pedidos/Total'
import TotalAnticipo from "../components/Pedidos/TotalAnticipo"
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'


//context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext'


const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input){
            id
            total
        }
    }
`


const OBTENER_PEDIDOS = gql`
query obtenerPedidosVendedor{
  obtenerPedidosVendedor{
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
  }
}

`

const NuevoPedido = () => {
    const router = useRouter()
    const [mensaje, setMensaje] = useState(null)

    //utilizar context y extraer sus valores
    const pedidocontext = useContext(PedidoContext)
    const { cliente, productos, total, anticipo, descuento, totalDescuento} = pedidocontext



    const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
        update(cache, { data: { nuevoPedido } }) {
            const { obtenerPedidosVendedor } = cache.readQuery({
                query: OBTENER_PEDIDOS
            })

            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data: {
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
                }
            })
        }
    })


    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : ""
    }

    const crearnuevoPedido = async () => {

        const { id } = cliente;


        //remover lo no deseado de productos

        const pedido = productos.map(({ __typename, existencia, ...producto }) => producto)


        try {
            const { data } = await nuevoPedido({
                variables: {

                    input: {
                        cliente: id,
                        total,
                        pedido,
                        anticipo,
                        descuento,
                        totalDescuento,
                        restaPorPagar: total - totalDescuento - anticipo

                    }

                }
            })
            console.log(data)

            //redireccionar 
            router.push('/pedidos');

            Swal.fire(
                'Correcto',
                "El pedido se registro correctamente",
                'success'
            )
        } catch (error) {
            setMensaje(error.message)

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }
    return (
        <Layout>
            <div className="bg-white p-3 rounded-md shadow">
                <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

                {mensaje && mostrarMensaje()}

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <AsignarCliente />
                        <AsignarProductos />
                        <ResumenPedido />
                        <Descuento />
                        <Anticipo/>
                        <TotalAnticipo />

                        <Total />

                        <button
                            type="button"
                            className={`bg-gray-800 w-full my-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                            onClick={() => crearnuevoPedido()}
                        >
                            Registrar Pedido
                </button>
                    </div>
                </div>
            </div>

        </Layout>


    )
}

export default NuevoPedido