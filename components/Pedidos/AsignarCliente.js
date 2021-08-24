import React, {useState, useEffect, useContext} from 'react'
import Select from 'react-select'
import { gql, useQuery} from "@apollo/client"
import PedidoContext from '../../context/pedidos/PedidoContext'
const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientes{
    obtenerClientes{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`

const AsignarCliente = () => {


    const [cliente, setcliente] = useState([])

    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {agregaCliente} = pedidocontext

    //consultar la base de datos
    const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO)

    // console.log(data)
    // console.log(loading)
    // console.log(error)



    useEffect(() =>{
        agregaCliente(cliente)
    }, [cliente])

    const SeleccionarCliente = cliente =>{
        setcliente(cliente)
    }

    if(loading) return null

    const { obtenerClientes } = data

    return ( 
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un cliente al pedido</p>
        <Select
                className="mt-3"
                options={obtenerClientes}
                onChange={opcion => SeleccionarCliente(opcion)}
                getOptionValue={( opciones) => opciones.id}
                getOptionLabel={(opciones) => opciones.nombre}
                placeholder="Seleccione el cliente"
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
     );
}
 
export default AsignarCliente;