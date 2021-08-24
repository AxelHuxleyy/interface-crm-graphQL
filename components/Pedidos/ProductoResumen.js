import React, { useContext, useState, useEffect } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext'

const ProductoResumen = ({producto}) => {

    //consumiendo context
    const pedidocontext = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidocontext

    const   [cantidad,setCantiodad] = useState(1)

    useEffect(() =>{
        actualizarCasntidad()
        actualizarTotal()
    }, [cantidad])

    const actualizarCasntidad= () =>{
        const nuevoProducto = {...producto, cantidad: Number(cantidad)}
        cantidadProductos(nuevoProducto)
    }

    const {nombre, precio } = producto
    return ( 
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p className="text-sm">$ {precio}</p>

            </div>
            <input type="number" placeholder="cantidad" 
            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline:none focus:shadow-outline md:ml-4"
            onChange={ (e) => setCantiodad(e.target.value) }
            value={cantidad}
            />
        </div>
     );
}
 
export default ProductoResumen;