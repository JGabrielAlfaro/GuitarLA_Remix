
import { getGuitarra } from "../models/guitarras.server";
import {useLoaderData} from '@remix-run/react'


export async function loader ( {params} ) {
    // console.log(request) // también se puede consultar los request
    const {guitarraUrl} = params;
    const guitarra = await getGuitarra(guitarraUrl);

    if (guitarra.data.length === 0){
        throw new Response("", {
            status:404,
            statusText:"Guitarra no encontrada"
        })
    }
    return guitarra;
}


export function meta ({data}){
    // console.log(data.dada) //el primer data, es de remix, el segundo de strapi.

    if (!data){
        return [    
                    { title:"GuitarraLA - Guitarra no encontrada"},
                    {description: `Guitarras, venta de guitarras, guitarra no encontrada`} 
                    
                ]
    }

    return (
        [
            { title: `GuitarLA - ${data.data[0].attributes.nombre}` },
            { description: `Guitarras, venta de guitarras ${data.data[0].attributes.nombre}` },
        ]
        
    )
}



const Guitarra = () => {
    const guitarra = useLoaderData();
    const {nombre,descripcion,imagen, precio}= guitarra.data[0].attributes;
  return (
    <div className="guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
      </div>
    </div>
  )
}

export default Guitarra
