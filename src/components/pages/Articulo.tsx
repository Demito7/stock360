import "./pages.css";
import Navegacion from "../Navegacion";
import ArticuloModal from "../modals/ArticuloModal";
import { useEffect, useState } from "react";
import { tiposDeDatos } from "../../types";
import { FixedSizeList as List } from "react-window";

function Articulo() {
    const [articulos, setArticulos] = useState<tiposDeDatos[]>([]);
    const [articuloModal, setArticuloModal] = useState(false);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState<tiposDeDatos | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [cargandoGuardar, setCargandoGuardar] = useState(false);
    const [cargandoEliminar, setCargandoEliminar] = useState(false);

    const articulosFiltrados = articulos.filter((articulo) => {
        const texto = busqueda.toLowerCase();
        return (
            (articulo.codigo ?? "").toString().toLowerCase().includes(texto) ||
            (articulo.codigop ?? "").toString().toLowerCase().includes(texto) ||
            (articulo.descripcion ?? "").toLowerCase().includes(texto) ||
            (articulo.marca ?? "").toLowerCase().includes(texto) ||
            (articulo.publico ?? "").toString().toLowerCase().includes(texto)
        );
    });

    useEffect(() => {
        const obtenerArticulos = async () => {
            try {
                const res = await fetch("http://localhost:5000/articulo");
                if (!res.ok) throw new Error("No se pudieron obtener los artículos.");
                const data: tiposDeDatos[] = await res.json();
                setArticulos(data);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerArticulos();
    }, []);

    const guardarArticulo = async (nuevoArticulo: tiposDeDatos): Promise<boolean> => {
        const metodo = nuevoArticulo.id ? "PUT" : "POST";
        const url = nuevoArticulo.id
            ? `http://localhost:5000/articulo/${nuevoArticulo.id}`
            : "http://localhost:5000/articulo";
        const articuloLimpio = { ...nuevoArticulo };
        if (metodo === "POST") delete articuloLimpio.id;

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(articuloLimpio),
            });
            if (!res.ok) return false;

            const data = await res.json();
            if (metodo === "POST") {
                setArticulos((prev) => [...prev, data]);
            } else {
                setArticulos((prev) => prev.map((a) => (a.id === data.id ? data : a)));
            }
            setArticuloModal(false);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const eliminarArticulo = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:5000/articulo/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setArticulos((prev) => prev.filter((articulo) => articulo.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarYCerrarModal = async (id?: number | null) => {
        if (id) await eliminarArticulo(id);
        setArticuloModal(false);
        setCargandoEliminar(false);
    };

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const articulo = articulosFiltrados[index];
        return (
            <div style={{ ...style, display: "flex" }}>
                <div className="articulo-tabla-contenido">{articulo.codigo}</div>    
                <div className="articulo-tabla-contenido">{articulo.codigop}</div>
                <div className="articulo-tabla-contenido">{articulo.descripcion}</div>
                <div className="articulo-tabla-contenido">{articulo.marca}</div>
                <div className="articulo-tabla-contenido">${articulo.publico}</div>
                <div className="articulo-tabla-contenido">
                    <button className="articulo-tabla-menos">
                        -
                    </button>
                    <button className="articulo-tabla-contenido-boton" onClick={() => {
                    setArticuloSeleccionado(articulo); setArticuloModal(true);}}>
                        Editar
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="navegacion">
                <h2>Articulo</h2>
                <Navegacion />
            </div>
            <div className="articulo-contenedor">
            
                <button className="articulo-nuevo" onClick={() => {
                    setArticuloSeleccionado(null);
                    setArticuloModal(true);
                }}>
                    Nuevo
                </button>

                <input className="articulo-buscar" type="text" placeholder="Buscar" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            
                <div className="articulo-tabla">
                    <div className="articulo-tabla-titulo">CODIGO</div>
                    <div className="articulo-tabla-titulo">C/PROVEEDOR</div>
                    <div className="articulo-tabla-titulo">DESCRIPCION</div>
                    <div className="articulo-tabla-titulo">MARCA</div>
                    <div className="articulo-tabla-titulo">PUBLICO</div>
                    <div className="articulo-tabla-titulo">ACCIONES</div>
                </div>
            
                <List
                    className="ocultar-scrollbar"
                    height={550} // altura visible de la lista
                    itemCount={articulosFiltrados.length}
                    itemSize={30} // altura de cada fila
                    width="100%"
                    >
                    {Row}
                </List>
            
                <ArticuloModal
                    modalAbierta={articuloModal}
                    modalGuardar={guardarArticulo}
                    articuloSeleccionado={articuloSeleccionado}
                    modalCerrar={() => setArticuloModal(false)}
                    eliminarYCerrarModal={eliminarYCerrarModal}
                    cargandoGuardar={cargandoGuardar}
                    setCargandoGuardar={setCargandoGuardar}
                    cargandoEliminar={cargandoEliminar}
                    setCargandoEliminar={setCargandoEliminar}
                    />
            </div>
        </>
    );
}

export default Articulo;