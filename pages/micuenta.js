import React from 'react';
import Layout from '../components/layout'

const miCuenta = () => {
    return (
        <Layout >
            <div className="flex imtems-center justify-center">

            <div className="w-10/12 p-3 rounded-md shadow-md bg-white p-5">
                <h1>Mi cuenta</h1>

                <div className="w-32 h-32 bg-blue-300 flex items-center justify-center rounded-full mt-5 text-xl text-white text-center">
                    asd
                </div>

                <div className="w-full mt-5 flex flex-row">
                    <div className="w-1/2 p-3 mr-2">
                        <p>Nombre</p>
                        <p>Apellido</p>
                        <p>administrador</p>
                        <p>fecha de ingreso</p>

                    </div>

                    <div className="w-1/2 p-3 mr-2 flex flex-col">
                        <p>cambiar contraseña</p>
                        <input type="text" name="" id="" placeholder="anterior contraseña" className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 " />
                        <input type="text" name="" id="" placeholder="nueva contraseña" className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 " />
                        <input type="text" name="" id="" placeholder="nueva contraseña" className="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg shadow-md py-1 px-4 block w-1/2 appearance-none leading-normal my-2 " />

                        <button className="bg-blue-400  font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md block w-1/2 appearance-none leading-normal my-2">
                            Cambiar contraseña
                        </button>

                    </div>

                </div>


            </div>
            </div>
        </Layout>
    );
}

export default miCuenta;