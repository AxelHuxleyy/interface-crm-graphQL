import React, {useContext, useState} from 'react'
import Layout from '../components/layout'
import AsignarCliente from '../components/Pedidos/AsignarCliente'
import AsignarProductos from '../components/Pedidos/AsignarProductos'
import ResumenPedido from '../components/Pedidos/ResumenPedido'
import Total from '../components/Pedidos/Total'
import Descuento from '../components/Pedidos/Descuento'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import Swal from 'sweetalert2'


//context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext'


const  NUEVA_VENTA = gql `
    mutation nuevaVenta($input: VentaInput){
        nuevaVenta(input: $input){
        id
        total
        
        }
    }
`


const nuevaVenta= () =>{
    const [mensaje, setMensaje] = useState(null)

    //utilizar context y extraer sus valores
    const pedidocontext = useContext(PedidoContext)
    const {cliente, productos, total, descuento, totalDescuento} = pedidocontext



    const [nuevaVenta] = useMutation(NUEVA_VENTA)
    const router = useRouter()


    const validarPedido = () =>{
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length  === 0 ? " opacity-50 cursor-not-allowed " : ""
    }

    const crearnuevoPedido = async  () =>{

        console.log("hola")
        const { id } = cliente;


        //remover lo no deseado de productos

        const pedido = productos.map(({__typename, existencia, ...producto}) => producto )

        console.log(pedido)
        try {
                const {data} = await nuevaVenta({
                    variables:{

                        input: {
                            cliente: id,
                            total,
                            descuento,
                            productos: pedido,
                            restaPorPagar: total - totalDescuento
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
            console.log(error)

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }

    const mostrarMensaje = () =>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }
    return(
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nueva Venta</h1>

            {mensaje && mostrarMensaje() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <AsignarCliente/>
                <AsignarProductos/>
                <ResumenPedido/>
                <Descuento />
                <Total />

                <button 
                    type="button"
                    className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                    onClick={() => crearnuevoPedido()}
                >
                    Registrar Venta
                </button>
                </div>
            </div>
            
        </Layout>

        
    )
}

export default nuevaVenta