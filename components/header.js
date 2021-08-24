import React from 'react';
import {useQuery, gql} from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
        id
        nombre
        apellido
        administrador
    }
}
`

const Header = () =>{
    const router = useRouter();

    const {data, loading, error} = useQuery(OBTENER_USUARIO)
    //console.log(data)
    //console.log(error)
    //console.log(loading)
    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        setTimeout(() => {
            router.push("/login")

        }, 1000);
    }
    //proteger que no se acceda a date antes de tener los datos 
    if(loading) return null;

    if(!data){ //checa si se obtienen los datos o si tiene el token
        localStorage.removeItem('token')
        router.push("/login")
    }
    
    if(error)
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un problema al comprobar tus credenciales',
          })
        
          router.push('/login')
    return null
    }

    const {nombre, apellido} = data.obtenerUsuario
    return(
        <div className="sm:flex sm:justify-between mb-6">
          <p className="mr-2 mb-5 lg:mb-0">Hola {nombre} {apellido}</p>
            <button onClick={() => cerrarSesion()} type="button" className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                     >
                Cerrar sesión
            </button>
        </div>
    )
}

export default Header