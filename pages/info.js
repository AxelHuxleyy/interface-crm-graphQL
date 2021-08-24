import React from 'react';
import Layout from '../components/layout'
const Info = () => {
    return ( 


        <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Esto es una prueba</h1>


        <div className="flex justify-center mt-5 bg-red-800">
            <div className="w-full max-w-lg">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-full"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                <h1 className="text-blue-500 text-lg font-bold ">prueba por:</h1>
                <h1 className="text-black-500 text-lg font-bold ">Axel Huxley Ramírez Sánchez 267916</h1>
                <h1 className="text-black-500 text-lg font-bold ">Israel Durán Zaleta 267892</h1>
                <h1 className="text-black-500 text-lg font-bold ">Emmanuel salinas Celestino243007</h1>

            </div>
        </div>
        
    </Layout>


     );
}
 
export default Info;