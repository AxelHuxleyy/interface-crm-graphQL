import React from 'react';
import Layout from '../components/layout'
//componentes
import Mensajes from '../components/resumen/mensajes'
import Empleados from '../components/resumen/empleados'
import Cuentas from '../components/resumen/cuentas'
import Historial from '../components/resumen/Historial'
import { gql, useQuery } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
        administrador
    }
  }
`



const resumen = () => {

    const { data, loading, error } = useQuery(OBTENER_USUARIO)
    const router = useRouter();



    return (
        <>




            <Layout>

                {loading ? <p>Comrpobando tus crendeciales...</p> : !data.obtenerUsuario.administrador ? <p>No cuentas con las credenciales</p> :
                    <>

                        <Cuentas />
                        <div className="flex justify-between w-full">
                            <Mensajes />

                            <Empleados />
                        </div>
                        <Historial />
                    </>

                }


            </Layout>
        </>



    );
}

export default resumen;