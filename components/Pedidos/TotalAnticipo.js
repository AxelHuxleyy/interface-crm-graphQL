import React, { useEffect, useState, useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext'

const TotalAnticipo = () => {

    const pedidocontext = useContext(PedidoContext)
    const {  anticipo } = pedidocontext
    return (
        <>
            <div className="flex items-center mt-0 justify-between bg-white-300 p-3 pt-0 border-solid border-2 border-gray-200">
                <h2 className="text-gray-800 text-lg">Anticipo</h2>
                <p className="text-gray-800 mt-0">$ {anticipo}</p>
            </div>
        </>
    );
}

export default TotalAnticipo;