import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import { useQuery, gql } from '@apollo/client'
import Swal from 'sweetalert2'
import SidebarTop from './SidebarTop'

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

const Siderbar = () => {

    const router = useRouter()
    const [isOpen, toggleSidebar] = useState(false);
    const { data, loading, error } = useQuery(OBTENER_USUARIO)

    if (loading) return null;

    if (!data) { //checa si se obtienen los datos o si tiene el token
        localStorage.removeItem('token')
        router.push("/login")
    }


    if (error) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "No estas logeado",
            footer: '<p>Ocurrio un problema con tus credenciales <p>'
        })
        router.push('/login')
        return null
    }

    const { administrador, nombre, apellido } = data.obtenerUsuario


    return (
        <>
            <div className="block lg:hidden fixed x-0 top-0  mt-3 ml-3 bg-blue-200">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white "

                    onClick={() => toggleSidebar(true)}

                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>

            <aside className={`lg:static fixed z-30 inset-y-0 left-0  bg-white w-1/3 xl:w-2/12 max-h p-3 pl-1 lg:translate-x-0 transform shadow-2xl overflow-y-auto ${
                isOpen
                    ? "translate-x-0 ease-out transition-medium"
                    : "-translate-x-full ease-in transition-medium"
                }`}>
                <SidebarTop nombre={nombre} apellido={apellido} />

                <div className="-mx-3 pl-3 pr-1 flex items-center justify-between ">

                    <p className=" text-2xl text-black">OPCIONES</p>

                </div>

                <nav className="mt-5 list-none ">
                    <li className={router.pathname === "/" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                <div className="flex items-center  ">
                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-4 "><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>

                            Clientes
                        </div>
                            </a>


                        </Link>
                    </li>
                    <li className={router.pathname === "/pedidos" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/pedidos">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                Pedidos
                        </a>
                        </Link>
                    </li>
                    <li className={router.pathname === "/productos" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/productos">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                Productos
                        </a>
                        </Link>
                    </li>
                    <li className={router.pathname === "/nuevoGasto" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/nuevoGasto">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                Nuevo Gasto
                        </a>
                        </Link>
                    </li>
                    <li className={router.pathname === "/nuevaVenta" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/nuevaVenta">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                Nueva Venta
                        </a>
                        </Link>
                    </li>
                </nav>

                {administrador ? (
                    <>
                        <div className="sm:mt-5">
                            <p className="text-black text-2xl ">OTRAS OPCIONES</p>
                        </div>
                        <nav className="mt-1 list-none">
                            <li className={router.pathname === "/resumen" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                                <Link href="/resumen">
                                    <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                        Resumen
                        </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/gastos" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                                <Link href="/gastos">
                                    <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                        Gastos
                        </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/nuevoempleado" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                                <Link href="/nuevoempleado">
                                    <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                        Nuevo empleado
                        </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/nuevoProducto" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                                <Link href="/nuevoProducto">
                                    <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                        Nuevo Producto
                                    </a>
                                </Link>
                            </li>
                        </nav>
                    </>
                ) : null
                }

                <div className="sm:mt-5">
                    <p className="text-black text-2xl ">Mi cuenta</p>
                </div>
                <nav className="mt-1 list-none">
                    <li className={router.pathname === "/micuenta" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/micuenta">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                Mi cuenta
                                    </a>
                        </Link>
                    </li>
                    <li className={router.pathname === "/mihistorial" ? "text-purple-900 pr-2 pb-2 pr-2 pt-2 border-l-4 border-blue-800 bg-gray-300" : "p-2 text-black hover:bg-gray-300 "}>
                        <Link href="/mihistorial">
                            <a className=" mb-2 block  hover:text-white-900 rounded-md">
                                Mi historial
                                    </a>
                        </Link>
                    </li>


                </nav>
                <button
                    onClick={() => toggleSidebar(false)}
                    className={!toggleSidebar ? "text-gray-700 lg:hidden bg-blue-900" : "hidden"}
                >
                    <svg fill="none" viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                            d="M6 18L18 6M6 6L18 18"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="white"
                        />
                    </svg>
                </button>
            </aside>

            {isOpen ?
                <div className={toggleSidebar ? " w-2/3 xl:w-10/12  fixed z-30 inset-y-0 right-0 bg-black bg-opacity-75" : "hidden"} onClick={() => toggleSidebar(false)}>

                </div>
                : null}

        </>
    )
}
export default Siderbar