import "./modals.css";
import { useEffect, useState } from "react";
import { tiposDeDatos, modalPropiedades, ValoresEnCero } from "../../types";


function AModal({ modalAbierta, modalCerrar, modalGuardar, articuloSeleccionado, eliminarYCerrarModal,
    setCargandoGuardar, cargandoGuardar, cargandoEliminar, setCargandoEliminar }: modalPropiedades) {


    // errores
    const [error, setError] = useState<string | null>(null);


    const [articuloDatos, setArticuloDatos] = useState<tiposDeDatos>(ValoresEnCero);


    useEffect(() => {
        if (modalAbierta) {
            setArticuloDatos(articuloSeleccionado ?? ValoresEnCero);
        }
    }, [articuloSeleccionado, modalAbierta]);
    

    useEffect(() => {
        if (articuloDatos.cganancia) {
            const costo = parseFloat(articuloDatos.costo ?? "") || 0;
            const ganancia = parseFloat(articuloDatos.ganancia ?? "") || 0;
            const ventaCalculada = costo + (costo * ganancia / 100);
            setArticuloDatos(prev => ({
                ...prev,
                publico: ventaCalculada.toFixed(2),
            }));
        }
    }, [articuloDatos.costo, articuloDatos.ganancia, articuloDatos.cganancia]);


    const manejarDecimales = (
        e: React.ChangeEvent<HTMLInputElement>,
        campo: keyof tiposDeDatos
    ) => {
        let valor = e.target.value.replace(",", ".");
        const regex = /^\d{0,8}(\.\d{0,2})?$/;

        if (!regex.test(valor)) {
            if (campo === "costo") {
                setError("el costo no puede tener mas de 8 digitos y 2 decimales");
            }
            return;
        }

        if (campo === "costo") {
            setError(null);
        }
        setArticuloDatos({ ...articuloDatos, [campo]: valor });
    };


    const cerrarYLimpiarInputs = () => {
        setArticuloDatos(ValoresEnCero);
        modalCerrar();
    };

    if (!modalAbierta) return null;

    return (
        <div className="modal">
            <div className="modal-contenido">
                <nav className="modal-nav">
                    <button className="modal-cerrar" onClick={cerrarYLimpiarInputs}>x</button>
                    <button type="submit" form="guardar" >{cargandoGuardar ? "Cargando..." : "Guardar"}</button>
                    <button type="button" onClick={() => {
                            const confirmar = window.confirm("¿Estás seguro de que querés eliminar este artículo?");
                            if (confirmar) {
                                setCargandoEliminar(true);
                                eliminarYCerrarModal(articuloSeleccionado?.id);
                            }
                    }}>{cargandoEliminar ? "Cargando..." : "Eliminar"}
                    </button>
                </nav>
                <form className="modal-form" id="guardar" onSubmit={async (e) => {
                    setCargandoGuardar(true);
                    e.preventDefault();
                    const exito = await modalGuardar(articuloDatos);
                    exito && modalCerrar();
                    setCargandoGuardar(false);
                }}>
                    <div className="articulo-grid">
                        <div className="articulo-modal-input">
                            <p>Código Propio</p>
                            <input type="text" value={articuloDatos.codigo ?? ""}
                                onChange={(e) => setArticuloDatos({ ...articuloDatos, codigo: e.target.value })} />
                        </div>
                        <div className="articulo-modal-input">
                            <p>Descripción</p>
                            <input type="text" value={articuloDatos.descripcion ?? ""}
                                onChange={(e) => setArticuloDatos({ ...articuloDatos, descripcion: e.target.value })} />
                        </div>
                        <div className="articulo-modal-input">
                            <p>Público</p>
                            <input type="text" value={articuloDatos.publico ?? ""}
                                disabled={articuloDatos.cganancia} onChange={(e) => manejarDecimales(e, "publico")}/>
                        </div>
                        <div className="articulo-modal-input">
                            <p>Código Proveedor</p>
                            <input type="text" value={articuloDatos.codigop ?? ""}
                                onChange={(e) => setArticuloDatos({ ...articuloDatos, codigop: e.target.value })} />
                        </div>
                        <div className="articulo-modal-input">
                            <p>Proveedor</p>
                            <input type="text" value={articuloDatos.proveedor ?? ""}
                                onChange={(e) => setArticuloDatos({ ...articuloDatos, proveedor: e.target.value })} />
                        </div>
                        <div className="articulo-modal-input">
                            <div className="articulo-modal-input-ganancia">
                            <p className={articuloDatos.cganancia ? "" : "texto-gris"}>Margen</p>
                                <input className="checkbox" type="checkbox" checked={articuloDatos.cganancia}
                                        onChange={(e) => setArticuloDatos((prev) => ({ ...prev, cganancia: e.target.checked }))} />
                            </div>
                            <input className="ganancia" type="text" disabled={!articuloDatos.cganancia}
                                value={articuloDatos.ganancia ?? ""} onChange={(e) => manejarDecimales(e, "ganancia")} />
                            <p>Ganancia: ${(parseFloat(articuloDatos.publico || "0") - parseFloat(articuloDatos.costo || "0")).toFixed(2)}</p>
                        </div>
                        <div className="articulo-modal-input">
                            <p>Código Marca</p>
                            <input type="text" />
                        </div>
                        <div className="articulo-modal-input">
                            <p>Marca</p>
                            <input type="text" value={articuloDatos.marca ?? ""}
                                onChange={(e) => setArticuloDatos({ ...articuloDatos, marca: e.target.value })} />
                        </div>
                        <div className="articulo-modal-input">
                            <p>Costo</p>
                            <input type="text" value={articuloDatos.costo ?? ""}
                                onChange={(e) => manejarDecimales(e, "costo")} />
                            {error && <p className="error">{error}</p>}
                            <p>Fecha: 21/05/2025</p>
                        </div>
                    </div>
                    <div className="articulo-observacion grid">
                        <div className="articulo-modal-input observacion">
                            <p>Observación</p>
                            <textarea value={articuloDatos.observacion ?? ""}
                                onChange={(e) => setArticuloDatos({ ...articuloDatos, observacion: e.target.value })} />
                        </div>
                        <div>
                            <div className="articulo-modal-input">
                                <p>Stock Local</p>
                                <input type="text"  value={articuloDatos.stock ?? ""}
                                    onChange={(e) => setArticuloDatos({ ...articuloDatos, stock: e.target.value })} />
                            </div>
                            <div className="articulo-modal-input">
                                <p>Stock Minimo</p>
                                <input type="text" value={""}
                                     />
                            </div>
                            <div className="articulo-modal-input">
                                <p>Stock Depósito</p>
                                <input type="text" value={articuloDatos.stockd ?? ""}
                                    onChange={(e) => setArticuloDatos({ ...articuloDatos, stockd: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AModal;