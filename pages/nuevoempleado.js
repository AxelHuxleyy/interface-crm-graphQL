import React, { Component, useState } from 'react'
import Layout from "../components/layout"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const NUEVA_CUENTA = gql`

mutation nuevoUsuario($input: UsuarioInput ){
    nuevoUsuario(input: $input){
      nombre
      apellido
      tienda
      administrador
      creado
    }
  }

`

const NuevaCuenta = () => {

    //state para mensaje 
    const [mensaje, guardarMensaje] = useState(null)
    const [administrador, setAdministrador] = useState(false)

    //mutation para crear nuevos usuarios

    const [nuevoUsuario] = useMutation(NUEVA_CUENTA)


    //routing 
    const router = useRouter();

    //validacion del formulario 
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("El nombre es obligatorio"),
            apellido: Yup.string().required("El apellido es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("El password es obligatorio").min(6, 'El password debe de ser minimo de 6 caracteres')


        }),
        onSubmit: async valores => {
            const { nombre, apellido, email, password } = valores
            try {
                //guardar en la base de datos 
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password,
                            administrador
                        }
                    }
                })
                console.log(data)
                //usuario creado correctamente
                guardarMensaje(`Se creo correctmante el Usuario: ${data.nuevoUsuario.nombre}`)
                
                //routing 
                console.log(administrador)
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error:', ''))
                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000);
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    const handleInputChange = () =>{
        setAdministrador(!administrador)
    }

    return (
        <>
            <Layout>
                {mensaje && mostrarMensaje()}
                <h1 className="text-center text-2xl text-white font-light">Crear Cuenta</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">
                                    Nombre
                            </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    placeholder="Nombre Usuario"
                                    onChange={formik.handleChange}

                                    value={formik.values.nombre}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.errors.nombre && formik.touched.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="apellido">
                                    Apellido
                            </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Usuario"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}


                                />
                            </div>
                            {formik.errors.apellido && formik.touched.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="email">
                                    Email
                            </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="email"
                                    type="email"
                                    placeholder="Email usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}


                                />
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="password">
                                    Password
                            </label>
                                <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="password"
                                    type="password"
                                    placeholder="password usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}

                                />
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 ">
                                    <input
                                    name="isGoing"
                                    type="checkbox"
                                    className="mr-2"
                                    checked={administrador}
                                    onChange={() => handleInputChange()} />
                                    Marcar si este usuario tendra permisos de administrador

                            </label>
                            
                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white  uppercase hover:bg-gray-900"
                                value="Crear nueva cuenta"
                            />
                        </form>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default NuevaCuenta