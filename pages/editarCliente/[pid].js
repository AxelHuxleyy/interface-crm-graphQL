import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'


const OBTENER_CLIENTE = gql`

    query obtenerCliente($id: ID!){
        obtenerCliente(id: $id){
            nombre
            apellido
            email
            telefono
            empresa
        }
    }


`
const ACTUALIZAR_CLIENTE = gql `

mutation actualizarCliente($id: ID!, $input: ClienteInput){
    actualizarCliente(id: $id, input: $input ){
        nombre
        email
    }
}




`

    


const editarCliente = () => {
    //obtener el id actual
    const router = useRouter()
    const { query: { id } } = router
    console.log(id)

    //consultar para obtener el cliente

    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    })

    //actualizar cliente
    const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE)

    //schema validacion

    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre del cliente es obligatorio'),
        apellido: Yup.string().required('El apellido del cliente es obligatorio'),
        empresa: Yup.string().required('El campo empresa es obligatorio'),
        email: Yup.string().email("Ingresa un Email valido").required('El email del cliente es obligatorio'),


    })

    if (loading) return 'Cargando';

    const { obtenerCliente } = data;

    //modifica el cliente en la base de datos

    const actualizarInfoCliente= async valores =>{
        const {nombre,apellido,empresa, email, telefono}= valores
        try {
            const {data} = await actualizarCliente({
                variables:{
                    id,
                    input:{
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }
            })

            //TODO:sweet alert
            console.log(data)
            
            //mostrar alerta
            Swal.fire(
                'Actualizado!',
                "El clientese elimino correctamente",
                'success'
              )

            //TODO: redireccionar 
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    console.log("este es usuario")
    console.log(obtenerCliente)

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
            <div className="flex justify-center mt-5 ">
                <div className="w-full max-w-lg">
                    <Formik
                    
                        validationSchema= {schemaValidacion}
                        enableReinitialize
                        initialValues= { obtenerCliente }
                        onSubmit={
                            (valores) => {
                                actualizarInfoCliente(valores)
                            }
                        }
                    >
                        {props => {
                            console.log(props)
                            return(

                            
                        <form
                            className = "bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                    >
                                    <div className="mb-4">
                                        <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">
                                            Nombre
                            </label>
                                        <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                            id="nombre"
                                            type="text"
                                            placeholder="nombre cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                             value={props.values.nombre}
                                        />
                                    </div>
                             {props.errors.nombre && props.touched.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{props.errors.nombre}</p>
                            </div>
                        ):null} 
                            <div className = "mb-4" >
                                    <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="apellido">
                                        Apellido
                            </label>
                                    <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                        id="apellido"
                                        type="text"
                                        placeholder="apellido cliente"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                         value={props.values.apellido}
                                    />
                            </div>
                     {props.errors.apellido && props.touched.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{props.errors.apellido}</p>
                            </div>
                        ):null} 
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="empresa">
                                    Empresa
                                    </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="empresa"
                                    type="text"
                                    placeholder="Emprsa cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                     value={props.values.empresa}
                                />
                            </div>
                             {props.errors.empresa && props.touched.empresa ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.empresa}</p>
                                    </div>
                                ):null} 
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="email">
                                    Email
                                    </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="email"
                                    type="email"
                                    placeholder="email cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                     value={props.values.email}
                                />
                            </div>
                             {props.errors.email && props.touched.email ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.email}</p>
                                    </div>
                                ):null} 
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="telefono">
                                    Telefono
                                    </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="telefono"
                                    type="tel"
                                    placeholder="telefono cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.telefono}
                                />
                            </div>
                            <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" value="editar cliente" />
                        </form>
                        )
                        }}
                    </Formik>
                </div>
            </div >
        </Layout >
    )
}

export default editarCliente