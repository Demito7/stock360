import { Link } from 'react-router-dom'
import "./components.css";

function Navegacion() {
    return (
        <nav className='barra-botones'>
            <button className='barra-boton'><Link to="/Articulo">Articulo</Link></button>
            <button className='barra-boton'><Link to="/Proveedor">Proveedor</Link></button>
            <button className='barra-boton'><Link to="/Deudor">Deudor</Link></button>
            <button className='barra-boton'><Link to="/Notificacion">Notificacion</Link></button>
            <button className='barra-boton'><Link to="/Configuracion">Configuracion</Link></button>
            <button className='barra-boton'><Link to="/">Usuario</Link></button>
        </nav>
    )
}

export default Navegacion;