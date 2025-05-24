import "./pages.css";
import Navegacion from "../components/Navegacion";
import { Link } from 'react-router-dom'

function Usuario() {
    return (
        <>
            <div className="login">
                <div className="navegacion">
                    <h2 className="navegacion-titulo">Login</h2>
                    <Navegacion />
                </div>
                <div className="login-container">
                    <form className='login-form'>
                        <div className="login-inputs">
                            <p>Email</p>
                            <input className="login-input" type='email' autoComplete="username" />
                        </div>
                        <div className="login-inputs-2">
                            <p>Contraseña</p>
                            <input className="login-input" type="password" autoComplete="current-password" />
                        </div>
                        <button className="login-button"><Link to="/Articulos">Ingresar</Link></button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Usuario