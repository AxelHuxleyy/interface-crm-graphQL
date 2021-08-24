import React, { PureComponent, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { gql, useQuery } from '@apollo/client'
import CustomizedDot from './CustomizedDot'


const OBTENER_DATOS_GRAFICA = gql`

query datosGrafica($dato: Int, $cuando: String){
  datosGraficaG(dato: $dato, cuando: $cuando){
    _id{
      dato
    }
    total
  },
  datosGraficaV(dato: $dato, cuando: $cuando){
    _id{
      dato
    }
    total
  }
}
`





const Grafica = (props)  => {
  //const jsfiddleUrl = 'https://jsfiddle.net/alidingling/9y9zrpjp/';
  const {cuando} = props
  const { data, loading, error, startPolling, stopPolling } = useQuery(OBTENER_DATOS_GRAFICA, {
    variables: {
      dato: 7,
      cuando: cuando
    }
  })

  useEffect(() => {
    startPolling(5000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])

  /*useEffect(() => {
      
  })*/



  if (loading) return "cargando..."

  console.log(data)



  const { datosGraficaG, datosGraficaV } = data
  //console.log(datosGraficaG.length)
  //console.log(datosGraficaV.length)

  var datosdegrafica = []

  const datos = () => {
  var unicodato
  if (datosGraficaG.length == 0 && datosGraficaV.length !== 0) {
    datosGraficaV.map(dato => {
      unicodato = { name: dato._id.dato, venta: dato.total, gasto: 0 }
      datosdegrafica.push(unicodato)
    })
  }
  if (datosGraficaV.length == 0 && datosGraficaG.length !== 0) {
    datosGraficaG.map(dato => {
      unicodato = { name: dato._id.dato, venta: 0, gasto: dato.total }
      datosdegrafica.push(unicodato)
    })
  }

  if(datosGraficaG.length !== 0 ){
    if (datosGraficaV.length > datosGraficaG.length && datosGraficaG.length !== 0) {
      console.log("gano venta")
      datosGraficaV.map((dato, i) => {
        const datosg=datosGraficaG.filter(datosg => datosg._id.dato == dato._id.dato)
        console.log("datosg", datosg)

        if(!datosg.length == 0){
          unicodato = { name: dato._id.dato, venta: dato.total, gasto: datosg[0].total }
          datosdegrafica.push(unicodato)
        }else{
          unicodato = { name: dato._id.dato, venta: dato.total, gasto: 0 }
          datosdegrafica.push(unicodato)
        }
      })
    }
  }

  

  if (datosGraficaG.length > datosGraficaV.length) {
    datosGraficaG.map((dato, i) => {
      const datosv=datosGraficaV.filter(datosg => datosg._id.dato == dato._id.dato)

        if(!datosv.length == 0){
          unicodato = { name: dato._id.dato, venta: dato.total, gasto: datosv[0].total }
          datosdegrafica.push(unicodato)
        }else{
          unicodato = { name: dato._id.dato, venta: dato.total, gasto: 0 }
          datosdegrafica.push(unicodato)
        }
    })
  }

  if (datosGraficaV.length == datosGraficaG.length) {
    datosGraficaG.map((dato, i) => {
      const datosvv=datosGraficaV.filter(datosg => datosg._id.dato == dato._id.dato)

        if(!datosvv.length == 0){
          unicodato = { name: dato._id.dato, venta: dato.total, gasto: datosvv[0].total }
          datosdegrafica.push(unicodato)
        }else{
          unicodato = { name: dato._id.dato, venta: dato.total, gasto: 0 }
          datosdegrafica.push(unicodato)
        }
    })
  }
  }


  datos();
  console.log(datosdegrafica)


  return (
    <>
      <ResponsiveContainer
        width={'99%'}
        height={550}
      >

        <LineChart
          width={500}
          height={300}
          data={datosdegrafica}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="venta" stroke="#38a169" dot={<CustomizedDot valor={2} />} />
          <Line type="monotone" dataKey="gasto" stroke="#9b2c2c" />
        </LineChart>
      </ResponsiveContainer>

    </>

  )

}

export default Grafica; 
