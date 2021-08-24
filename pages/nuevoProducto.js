import React, { Component } from 'react'
import Layout from '../components/layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'
import Swal from 'sweetalert2'
import {useRouter} from 'next/router'

const NUEVO_PRODUCTO = gql `

    mutation nuevoProducto($input: ProductoInput ){
        nuevoProducto(input: $input){
            id
            nombre
            existencia
            precio
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

const NuevoProducto = () =>{

    const router = useRouter()
    //mutation de apollo
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO,{
        update(cache,{ data: { nuevoProducto}}) {
            //obtener el objeto de cache
            const {obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS})
            //rescribir ese objeto
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, NuevoProducto]
                }
            })
        }
    })


    //formulario para nuevos productos
    const formik = useFormik({
        initialValues: {
            nombre:'',
            existencia: '',
            precio: '',
            marca: '',
            modelo: '',
            descripcion: '',
            stockMinimo: '',
            precioCompra: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("El nombre del producto es obligatorio"),
            existencia: Yup.number().required("Agrega la cantidad disponible").positive("No se aceptan numeros negativos").integer('La existencia deben ser numeros enteros'),
            precio: Yup.number().required("El precio es obligatorio").positive("No se admiten numeros negativos"),
            stockMinimo: Yup.number().required("Es necesario este campo").positive("Solo se admiten numeros positivos").integer("El numero debe de ser numeros enteros"),
            precioCompra: Yup.number().required("Es necesario este campo").positive("Solo se admiten numeros positivos"),
            marca: Yup.string(),
            modelo: Yup.string(),
            descripcion: Yup.string()
        }),
        onSubmit: async valores => {
            const {nombre, existencia, precio, marca, modelo, descripcion, stockMinimo, precioCompra} = valores
            console.log(valores)
           try {
               const {data} = await nuevoProducto({
                   variables:{
                       input: {
                            nombre,
                            existencia,
                            marca,
                            modelo,
                            descripcion,
                            stockMinimo,
                            precioCompra,
                            precio
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

                <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Producto</h1>
                <div className="flex justify-center mt-5 ">
                <div className="w-full max-w-lg">
                    <form 
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">
                                Nombre
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="nombre"
                                type="text"
                                placeholder="nombre producto"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                            />
                        </div>
                        {formik.errors.nombre && formik.touched.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ):null}

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="marca">
                                Marca
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="marca"
                                type="text"
                                placeholder="Marca del producto"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.marca}
                            />
                        </div>
                        {formik.errors.marca && formik.touched.marca ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.marca}</p>
                            </div>
                        ):null}

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="modelo">
                                Modelo
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="modelo"
                                type="text"
                                placeholder="nombre producto"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.modelo}
                            />
                        </div>
                        {formik.errors.modelo && formik.touched.modelo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.modelo}</p>
                            </div>
                        ):null}

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="descripcion">
                                Descripcion
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="descripcion"
                                type="text"
                                placeholder="nombre producto"
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

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="existencia">
                                Cantidad disponible
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="existencia"
                                type="number"
                                placeholder="cantidad disponible"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.existencia}
                            />
                        </div>
                        {formik.errors.existencia && formik.touched.existencia ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.existencia}</p>
                            </div>
                        ):null}

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="stockMinimo">
                                Stock minimo:
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="stockMinimo"
                                type="number"
                                placeholder="cantidad disponible"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.stockMinimo}
                            />
                        </div>
                        {formik.errors.stockMinimo && formik.touched.stockMinimo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.stockMinimo}</p>
                            </div>
                        ):null}

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="precioCompra">
                                $ Precio de compra
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="precioCompra"
                                type="number"
                                placeholder="Precio producto"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.precioCompra}
                            />
                        </div>
                        {formik.errors.precioCompra && formik.touched.precioCompra ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.precioCompra}</p>
                            </div>
                        ):null}

                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="precio">
                                $ Precio de venta
                            </label>
                            <input className=" shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="precio"
                                type="number"
                                placeholder="Precio producto"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.precio}
                            />
                        </div>
                        {formik.errors.precio && formik.touched.precio ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ):null}
                        <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" value="Agregar Producto"/>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoProducto