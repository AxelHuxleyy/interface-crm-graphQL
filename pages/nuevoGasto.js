import React, { Component } from 'react'
import Layout from '../components/layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'
import Swal from 'sweetalert2'
import {useRouter} from 'next/router'

const NUEVO_GASTO = gql `

mutation nuevoGasto($input: GastoInput){
    nuevoGasto(input: $input){
      id
      monto
      titulo
      descripcion
    }
  }
`

const OBTENER_PRODUCTOS = gql`

  query obtenerProductos{
    obtenerProductos{
      id
      nombre
      precio
      existencia
    }
  }

`

const NuevoGasto = () =>{

    const router = useRouter()
    //mutation de apollo
    const [nuevoGasto] = useMutation(NUEVO_GASTO/*,{
        update(cache,{ data: {nuevoGasto}}) {
            //obtener el objeto de cache
            const {obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS})
            //rescribir ese objeto
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoGasto]
                }
            })
        }
    }*/)


    //formulario para nuevos productos
    const formik = useFormik({
        initialValues: {
            titulo:'',
            monto: '',
            descripcion: '',
            
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required("El nombre del producto es obligatorio"),
            monto: Yup.number().required("Agrega la cantidad disponible").positive("No se aceptan numeros negativos").integer('La existencia deben ser numeros enteros'),
            descripcion: Yup.string()
        }),
        onSubmit: async valores => {
            const {titulo, monto, descripcion} = valores
            console.log(valores)
           try {
               const {data} = await nuevoGasto({
                   variables:{
                       input: {
                            titulo,
                            monto,
                            descripcion
                        }
                   }
               })

               console.log(data)
               //mostrar alerta 
               Swal.fire(
                   'Creado',
                   'Se creo el producto correctamente',
                   "success"
               )
               //redireccionar
                router.push("/productos")
           } catch (error) {
               console.log(error)
           }
        }
    })



    return(
        <Layout>

                <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Gasto</h1>
                <div className="flex justify-center mt-5 ">
                <div className="w-full max-w-lg">
                    <form 
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-md"
                    onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="titulo">
                                Titulo
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="titulo"
                                type="text"
                                placeholder="titulo del gasto"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.titulo}
                            />
                        </div>
                        {formik.errors.titulo && formik.touched.titulo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.titulo}</p>
                            </div>
                        ):null}
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="monto">
                                $$ total
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="monto"
                                type="number"
                                placeholder="$ cantidad que se gasto"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.monto}
                            />
                        </div>
                        {formik.errors.monto && formik.touched.monto ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.monto}</p>
                            </div>
                        ):null}
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="descripcion">
                                descripcion
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="descripcion"
                                type="text"
                                placeholder="descripcion"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.descripcion}
                            />
                        </div>
                        {formik.errors.descripcion && formik.touched.descripcion ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.descripcion}</p>
                            </div>
                        ):null}
                        <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" value="Agregar Gasto"/>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoGasto