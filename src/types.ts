export type tiposDeDatos = {
    id?: number;
    codigo: string;
    codigop: string;
    descripcion: string;
    marca: string;
    publico: string;
    proveedor: string;
    costo: string;
    stock: string;
    stockd: string;
    observacion: string;
    cganancia: boolean;
    ganancia?: string;
};

export type modalPropiedades = {
    modalAbierta: boolean;
    modalCerrar: () => void;
    modalGuardar: (data: tiposDeDatos) => Promise<boolean>;
    articuloSeleccionado: tiposDeDatos | null;
    eliminarYCerrarModal: (id?: number | null) => void;
    cargandoGuardar: boolean;
    setCargandoGuardar: (valor: boolean) => void;
    cargandoEliminar: boolean;
    setCargandoEliminar: (valor: boolean) => void;
};

export const ValoresEnCero: tiposDeDatos = {
    id: undefined,
    codigo: "",
    codigop: "",
    descripcion: "",
    marca: "",
    publico: "",
    proveedor: "",
    costo: "",
    stock: "",
    stockd: "",
    observacion: "",
    cganancia: false,
    ganancia:""
};