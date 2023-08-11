
import {getPost} from '../models/posts.server'
import {useLoaderData} from '@remix-run/react'
import { formattearFecha } from '../utils/helper';
import styles from '~/styles/blog.css'

export function links() {
    return [
      {
        rel: "stylesheet",
        href: styles,
      }
    ]
  }

  export function meta ({data}){
    // console.log(data.dada) //el primer data, es de remix, el segundo de strapi.

    if (!data){
        return [    
                    { title:"GuitarraLA - Entrada no encontrada"},
                    {description: `Guitarras, blog, entrada no encontrada`} 
                    
                ]
    }

    return (
        [
            { title: `GuitarLA - ${data.data[0].attributes.titulo}` },
            { description: `Guitarras, blog, entrada ${data.data[0].attributes.titulo}` },
        ]
        
    )
}

export async function loader ({params}){

    const {postUrl}= params;
    const post = await getPost(postUrl)

    if (post.data.length === 0){
        throw new Response ('',{
            status: 404,
            statusText: "Entrada no encontrada"
        })
    }
    return post
}

const Post = () => {
    const post = useLoaderData();
    const {titulo, contenido, imagen, publishedAt} = post?.data[0]?.attributes;

  return (
    <article className='post mt-3'>
       <img className="imagen" src={imagen?.data?.attributes?.url} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formattearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>

      </div>
    </article>
  )
}

export default Post
