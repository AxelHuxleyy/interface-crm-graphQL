import React, {useState, useEffect, useContext} from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext'
import { useFormik} from 'formik'
import * as Yup from 'yup'

const Descuento = () => {

    const [descuento, setDescuento] = useState(0)

    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {agregarDescuento, actualizarTotal, obtenerDescuento} = pedidocontext

    useEffect(() =>{
        agregarDescuento(Number(descuento))
        actualizarTotal()
        obtenerDescuento()
    }, [descuento])

    
    

    return ( 
        <div className="mt-3">
                        <p className="mt-10 my-2 bg-white border-l-4 border-yellow-500 text-gray-700 p-2 text-sm font-bold">Asignar un % de descuento</p>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "

                                id="descuento"
                                type="number"
                                placeholder="Descuento"
                                value={descuento}
                                onChange={e => setDescuento(e.target.value)}


                            />        
        </div>
     );
}
 
export default Descuento;