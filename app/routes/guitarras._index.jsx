import {useLoaderData} from '@remix-run/react'
import { getGuitarras } from "../models/guitarras.server";
import ListadoGuitarras from '../components/listado-guitarras'




export async function loader(){
  const guitarras = await getGuitarras();
  return guitarras.data;
  
}

export function meta (){
  return (
      [
          { title: 'GuitarLA -Tienda de Guitarras' },
          { description: 'GuitarraLA - Nuestra coleccion de guitarra' },
      ]
      
  )
}

const Tienda = () => {
  const guitarras = useLoaderData()
  // console.log(guitarras)
  return (
          <ListadoGuitarras guitarras={guitarras}/>

  )
}

export default Tienda
