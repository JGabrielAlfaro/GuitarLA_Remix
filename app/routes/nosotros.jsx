import imagen from "../../public/img/nosotros.jpg"
import styles from '~/styles/nosotros.css'


export function meta (){
  return (
      [
          { title: 'GuitarLA - Sobre noostros' },
          { description: 'Venta de guitarras, blog de música' },
      ]
      
  )
}
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel:'preload',
      href: imagen,
      as:'image'
    }
  ]
}
const Nosotros = () => {

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros"/>

        <div>
        <p> Aliquam at erat in sapien pharetra sagittis. Donec tristique rutrum neque, sit amet hendrerit odio iaculis ut. Morbi nec orci in neque sollicitudin malesuada. Integer vulputate arcu nibh, nec efficitur augue tincidunt nec. Proin non commodo risus, ut gravida leo. Proin diam nibh, mollis vitae ultricies sit amet, tincidunt vel est. In placerat facilisis odio, id pretium odio efficitur tempor. Quisque sollicitudin mi at turpis pretium, vestibulum porta nisl consectetur. </p>
        <p> Aliquam at erat in sapien pharetra sagittis. Donec tristique rutrum neque, sit amet hendrerit odio iaculis ut. Morbi nec orci in neque sollicitudin malesuada. Integer vulputate arcu nibh, nec efficitur augue tincidunt nec. Proin non commodo risus, ut gravida leo. Proin diam nibh, mollis vitae ultricies sit amet, tincidunt vel est. In placerat facilisis odio, id pretium odio efficitur tempor. Quisque sollicitudin mi at turpis pretium, vestibulum porta nisl consectetur. </p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
