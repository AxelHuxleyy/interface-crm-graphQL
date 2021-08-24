import React, { Component } from 'react'
import Layout from '../../components/layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useQuery, useMutation} from '@apollo/client'
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
const OBTENER_USUARIO= gql `
query obtenerUsuarioEspecifico($id: ID!){
    obtenerUsuarioEspecifico(id: $id){
      nombre
      id
      apellido
      tienda
      creado
    }
  }
`



const Pago = () =>{

    const router = useRouter()
    const { query: { id } } = router
    //mutation de apollo
    const [nuevoGasto] = useMutation(NUEVO_GASTO)
    const {data, loading, error}= useQuery(OBTENER_USUARIO,{
        variables:{
            id
        }
    })
    if(loading) "cargando..."
    if(error) router.push("/resumen")


    //formulario para nuevos productos
    const formik = useFormik({
        initialValues: {
            monto: '',
        },
        validationSchema: Yup.object({
            monto: Yup.number().required("Agrega la cantidad disponible").positive("No se aceptan numeros negativos").integer('La existencia deben ser numeros enteros'),
        }),
        onSubmit: async valores => {
            const { monto, } = valores
            console.log(valores)
           try {
               const {data} = await nuevoGasto({
                   variables:{
                       input: {
                            titulo:"Pago a empleado",
                            monto,
                            descripcion: `Se realizo un pago a ${data.obtenerUsuarioEspecifico.nombre}`
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
                router.push("/resumen")
           } catch (error) {
               console.log(error)
           }
        }
    })
    return(
        <Layout>

                <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Gasto</h1>
                {loading ? null : <h1>Pagar a {data.obtenerUsuarioEspecifico.nombre}</h1>}
                <div className="flex justify-center mt-5 ">
                <div className="w-full max-w-lg">
                    <form 
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-md"
                    onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block texxt-gray-700 text-sm font-bold mb-2 " htmlFor="monto">
                                $ total
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
                        <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" value="Pagar a empleado"/>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Pago