import {Outlet} from '@remix-run/react'
import styles from '~/styles/guitarras.css'

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    }
  ]
}
const Tienda = () => {

  return (
    <div>
       <main className='contenedor'>
          <Outlet/>
       </main>
    </div>
  )
}

export default Tienda
