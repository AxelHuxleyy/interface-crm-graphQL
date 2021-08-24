import React, { useState } from 'react'
import { useRouter } from 'next/router'

const SidebarTop = props => {
    const router = useRouter();


    const {nombre, apellido} = props

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        setTimeout(() => {
            router.push("/login")

        }, 1000);
    }

    const text = nombre[0]+apellido[0]
    return (

        <div className="-mx-3 pl-3 pr-1 h-20  flex items-center mb-2 shadow-md">
            <div className="bg-blue-300 w-20 rounded-full h-full relative  flex items-center text-center justify-center text-xl text-white mr-2 mb-4">{text}</div>
            <div className="mb-4">
                <p className="ml-1" > {nombre} </p>
                <button type="button" onClick={() => cerrarSesion()} className="bg-blue-400 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
                    Cerrar sesion
                        </button>
            </div>

        </div>
    );
}

export default SidebarTop;