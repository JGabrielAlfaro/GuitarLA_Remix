

export async function getCurso (url){
    const respuesta = await fetch(`${process.env.API_URL}/curso?populate=imagen`)
    return await respuesta.json();
}