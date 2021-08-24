import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'



const OBTENER_HISTORIAL = gql`

query obtenermiHistorial{
    obtenerMiHistorial{
      accion
        usuario{
          nombre
          apellido
          email
        }
        creado
        referencia
        descripcion
    }
  }
`



const Historial = () => {


    const router = useRouter();
    const { query: { id } } = router



    const { data, loading, error, startPolling, stopPolling } = useQuery(OBTENER_HISTORIAL)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    // console.log(data)
    // console.log(loading)
    // console.log(error)


    const check = () => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No estas logeado!',
            })

            router.push('/login')
            return null
        } else {

        }
    }




    return (
        <div>
            <Layout>
                <div className="bg-white p-3 rounded-md shadow">

                    <h1 className="text-2xl text-gray-800 font-light">Historial</h1>

                    <div className="overflow-x-scroll">
                        <table className="table-auto shadow-md mt-10 w-full w-lg">
                            <thead className="bg-gray-800 ">
                                <tr className="text-white">
                                    <th className="w-1/5 py-2">Acción</th>
                                    <th className="w-1/5 py-2">Descripcion</th>
                                    <th className="w-1/5 py-2">vendedor</th>
                                    <th className="w-1/5 py-2">creado</th>
                                    <th className="w-1/5 py-2">Referencia</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {loading ? <p>Cargnado...</p> :

                                    data.obtenerMiHistorial.map(historial => {

                                        const today = new Date(Number(historial.creado))

                                        const dd = String(today.getDate()).padStart(2, '0')
                                        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                        const yyyy = today.getFullYear();
                                        console.log(today)
                                        const h = today.getHours()
                                        const m = today.getMinutes()

                                        const fecha = `${dd}/${mm}/${yyyy} ${h}:${m}`
                                        console.log(fecha)

                                        return (
                                            <tr key={historial.id}>
                                                <td className="border px-4 py-2">{historial.accion}</td>
                                                <td className="border px-4 py-2">{historial.descripcion}</td>
                                                <td className="border px-4 py-2">{historial.usuario.nombre}</td>
                                                <td className="border px-4 py-2">{fecha}</td>
                                                <td className="border px-4 py-2">
                                                    {
                                                        historial.referencia ? (
                                                            <button type="button" className="flex justify-center items-center bg-gray-700 rounded py-2 px-4 w-full text-white text-xs uppercase font-bold" onClick={() => EditarProducto()}>
                                                                Ver reporte
                                                                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="bl-1 w-4 h-4"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                            </button>
                                                        ) : (
                                                                <h3> No aplica </h3>
                                                            )
                                                    }

                                                </td>
                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </div>

    )
}

export default Historial