
import { useState,useEffect } from "react"
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from "@remix-run/react"

import style from './styles/index.css'
import Header from "./components/header"
import Footer from "./components/footer"

export function meta (){
    return (
        [
            { charset: 'utf-8' },
            { title: 'Guitar - LA - Remix' },
            { viewport: "width=device-width,initial-scale=1"}
        ]
        
    )
}



export function links(){
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel:'preconnect',
            href:'https://fonts.googleapis.com'
        },
        {
            rel:'preconnect',
            href:'https://fonts.gstatic.com',
            crossOrigin:"true",
        },
        {
            rel:'stylesheet',
            href:'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel:'stylesheet',
            href:style,
        }
    ]

    
}
export default function App  () {

    //Si el código es del navegador agrega localStorage, si es del servidor pone un null.
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null; 
    const [carrito,setCarrito]=useState(carritoLS);

    useEffect(()=>{
        localStorage.setItem('carrito', JSON.stringify(carrito) )
    },[carrito])

    const agregarCarrito = (guitarra) =>{

        //validamos que existe un carrito igual por el id.
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)){

            //iterar sobre el arreglo e identificar el elemento duplicado.
            const carritoActualizado = carrito.map (guitarraState => {
                if (guitarraState.id === guitarra.id){
                    //Reescribir la cantidad.
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState;
            })
            //Añadir al carrito y sobre-escribirlo totalmente.
            setCarrito(carritoActualizado)

        }else {

            //Registro nuevo y agregar al carrito.
            setCarrito([...carrito,guitarra])

        }

    }

    const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map ( guitarraState => {
        if (guitarraState.id === guitarra.id){
            guitarraState.cantidad= guitarra.cantidad
        }
        return guitarraState;
    })
    setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        setCarrito(carrito.filter( guitarraState => guitarraState.id !== id))
    }

  return (
    <Document>
      <Outlet
        context={{
           agregarCarrito,
           carrito,
           actualizarCantidad,
           eliminarGuitarra
        }}
      />
    </Document>
  )
}

function Document ({children}){
    return (
      
        <html lang="es">
            <head>
                <Meta/>
                <Links/>
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    )
}



// Manejo de errores

export function ErrorBoundary(){
    const error = useRouteError()

    if (isRouteErrorResponse(error)){
        return (
            <Document>
                <p className="error">{error.status} {error.statusText} </p>
                <Link className="error-enlace" to="/">Talvez quiera volver a la página principal</Link>
            </Document>
        )
    }
}

