
import { useEffect,useState } from 'react'
import {ClientOnly} from 'remix-utils'
import {useOutletContext} from '@remix-run/react'
import styles from '../styles/carrito.css'


export function meta (){
    return (
        [
            { title: 'GuitarLA - Carrito de Compras' },
            { description: 'Venta de guitarra, compras' },
        ]
        
    )
}

export function links() {
    return [
      {
        rel: "stylesheet",
        href: styles,
      }
    ]
}
const Carrito = () => {

  const [total, setTotal] = useState(0);
  const {carrito,actualizarCantidad,eliminarGuitarra} = useOutletContext();
  // console.log(carrito)

  useEffect(()=>{
    const calculoTotal = carrito.reduce( (total,producto) => total + (producto.cantidad + producto.precio), 0)
    setTotal(calculoTotal)
  },[carrito])

  return (
    <ClientOnly fallback={'Cargando...'}>
       {()=>(
        <main className="contenedor">
            <h1 className="heading">Carrito de compras</h1>

            <div className="contenido">

                <div className="carrito">
                    <h2>Articulos</h2>
                    {carrito?.lenght === 0 ? 'Carrito Vacio' : (
                      carrito?.map (producto => (
                        <div key={producto.id} className='producto'> 
                            <div> 
                                <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}}`}/>
                            </div>

                            <div> 
                              <p className='nombre'>{producto.nombre}</p>
                              <p >Cantidad: </p>
                              <select 
                                value={producto.cantidad}
                                className='select'
                                onChange={e => actualizarCantidad({
                                  cantidad: +e.target.value,
                                  id:producto.id
                                })}
                              >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                              </select>

                              <p className='precio'>Precio U: $<span>{producto.precio}</span></p>
                              <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                            </div>
                            
                            <button 
                              type='button'
                              className='btn_eliminar'
                              onClick={e => eliminarGuitarra(producto.id)}
                                
                            >X</button>
                        </div>
                      ))
                    )}
                </div>

                <aside className="resumen">
                        <h3>Resumen de pedidos</h3>
                        <p>Total a pagar: ${total}</p>
                </aside>

            </div>

          
        </main>
      )}
    </ClientOnly>
  )
}

export default Carrito
