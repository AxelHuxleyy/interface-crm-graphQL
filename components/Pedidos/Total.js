import React, { useEffect, useState, useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext'

const Total = () => {

    const pedidocontext = useContext(PedidoContext)
    const { total, anticipo, totalDescuento } = pedidocontext
    return (
        <>
            <div className="flex items-center mt-5 justify-between bg-white-300 p-3 border-solid border-2 border-gray-200">
                <h2 className="text-gray-800 text-lg">Total del pedido</h2>
                <p className="text-gray-800 mt-0">$ {total}</p>
            </div>
            <div className="flex items-center mt-0 justify-between bg-white-300 p-3 pt-0 border-solid border-2 border-gray-200">
                <h2 className="text-gray-800 text-lg">Descuento</h2>
                <p className="text-gray-800 mt-0">$ {totalDescuento}</p>
            </div>
            
            <div className="flex items-center mt-5 justify-between bg-white-300 p-3 border-solid border-2 border-gray-200">
            <h2 className="text-gray-800 text-lg">Resto a pagar</h2>
            <p className="text-gray-800 mt-0">$ {total - totalDescuento - anticipo}</p>
        </div>
        </>
    );
}

export default Total;