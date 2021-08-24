import React, { Component, useState } from 'react'
import Layout from "../components/layout"
import { useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'
import { useRouter } from 'next/router'
import Router from 'next/router'


const AUTENTICAR_USUARIO = gql`

    mutation autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input:$input){
            token
        }
    }




`
const Login = () =>{
    
    const router = useRouter();

    const [mensaje, guardarMensaje] = useState(null)
    //mutation para crear nuevos usuarios en apollo
    const [ autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)
    const formik = useFormik({
        initialValues:{
            email: '',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El formato del email no es valido').required("El email no puede ir vacio"),
            password: Yup.string().required("El password es obligatorio")
        }),
        onSubmit: async valores =>{
            const {email, password} = valores;
            console.log(valores)
            try {
                /*const {data} = await autenticarUsuario({
                    variables:{
                        input:{
                            email,
                            password
                        }
                    }
                })
                console.log(data)
                guardarMensaje('autenticando...')
                //guardar token en localstorage

                setTimeout(() => {
                    const {token} = data.autenticarUsuario
                    localStorage.setItem('token', token);

                }, 1000);
                //redireccionar hacia el cliente 

                setTimeout(() => {
                    guardarMensaje(null)
                    router.push('/')
                }, 2000);
                */
               const id = "5ef65be5ab66411e1c6a2187"
               Router.push({
                pathname: "/login/[id]",
                query: {id}
            })
            } catch (error) {
                console.log(error.message) 
                guardarMensaje(error.message.replace('GraphQL error:', ''))
                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000);  
            }
        }
    })

    const mostrarMensaje = () =>{
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <>
        <Layout>
            <h1 className="text-center text-2xl text-white font-light">Login</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form className="bg-white rounded  shadow-md px-8 pt-6 pb-8"  onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="email">
                                Email
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="email"
                                type="email"
                                placeholder="Email usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>

                        {formik.errors.email && formik.touched.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ):null}
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="password">
                                Password
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="password"
                                type="password"
                                placeholder="password usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ):null}
                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white  uppercase hover:bg-gray-900"
                            value="iniciar Sesión"
                        />
                    </form>
                </div>

            </div>
        </Layout>
        </>
    )
}

export default Login