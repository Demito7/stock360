import Articulo from "./components/pages/Articulo"
import Proveedor from "./components/pages/Proveedor"
import Deudor from './components/pages/Deudor'
import Notificacion from './components/pages/Notificacion'
import Configuracion from './components/pages/Configuracion'
import Usuario from './components/pages/Usuario'
import './app.css'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <>
            <Routes>
                <Route path='*' element={<h2>No se encontró la ruta</h2>} />
                <Route path='/' element={<Usuario />} />
                <Route path='/Articulo' element={<Articulo />} />
                <Route path='/Proveedor' element={<Proveedor />} />
                <Route path='/Deudor' element={<Deudor />} />
                <Route path='/Notificacion' element={<Notificacion />} />
                <Route path='/Configuracion' element={<Configuracion />} />
            </Routes>
        </>
    )
}

export default App