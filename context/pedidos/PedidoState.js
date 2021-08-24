import React, {useReducer} from 'react'
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL,
    AGREGAR_DESCUENTO,
    AGREGAR_ANTICIPO,
    OBTENER_DESCUENTO

} from '../../types'

const VentaState= ({children}) =>{
    //pedido state
    const initialState={
        cliente: {},
        productos:[],
        total:0,
        descuento: 0,
        totalDescuento: 0,
        anticipo: 0

    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

   //modifica cliente

   const agregaCliente = cliente =>{
        // console.log(cliente)
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
   }


   //modifica los productos

   const agregarProducto = productoSeleccionados =>{

        let nuevoState;

        if(state.productos.length > 0){
            //tomar del segundo arreglo una copia para asignarlo al primero
            nuevoState= productoSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)
                return { ...producto, ...nuevoObjeto}
            })
        } else {
            nuevoState= productoSeleccionados
        }

       dispatch({
           type: SELECCIONAR_PRODUCTO,
           payload: nuevoState
       })
   }

   //modifica las cantidades  de los productos 
   const cantidadProductos = nuevoProducto =>{
    dispatch({
        type: CANTIDAD_PRODUCTOS,
        payload: nuevoProducto
    })
   }

   const actualizarTotal = () =>{
       dispatch({
           type: ACTUALIZAR_TOTAL
       })
   }

   const agregarDescuento = descuento =>{
       dispatch({
           type: AGREGAR_DESCUENTO,
           payload: descuento
       })
   }
   
   const agregarAnticipo = anticipo =>{
       dispatch({
           type: AGREGAR_ANTICIPO,
           payload: anticipo
       })
   }

   const obtenerDescuento = () =>{
       dispatch({
           type: OBTENER_DESCUENTO
       })
   }

    return(
        <PedidoContext.Provider
    
        value={{
            cliente: state.cliente,
            productos: state.productos,
            total: state.total,
            anticipo: state.anticipo,
            descuento: state.descuento,
            totalDescuento: state.totalDescuento,
            agregaCliente,
            agregarProducto,
            cantidadProductos,
            actualizarTotal,
            agregarDescuento,
            agregarAnticipo,
            obtenerDescuento
        }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default VentaState