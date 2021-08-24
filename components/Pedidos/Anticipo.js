import React, {useEffect, useState, useContext} from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext'

const Anticipo = () => {

    const [anticipo, setAnticipo] = useState(0)

    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {agregarAnticipo} = pedidocontext

    useEffect(() =>{
        agregarAnticipo(Number(anticipo))
    }, [anticipo])
    return ( 
        <div className="mt-3">
                        <p className="mt-10 my-2 bg-white border-l-4 border-yellow-500 text-gray-700 p-2 text-sm font-bold">Anticipo del cliente</p>

                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="email"
                                type="text"
                                placeholder="Anticipo"
                                value={anticipo}
                                onChange={e => setAnticipo(e.target.value)}
                            />        
        </div>
     );
}
 
export default Anticipo;