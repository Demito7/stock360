import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

function normalizarDatosArticulo(datos) {
    const parseOrNull = (valor, tipo) => {
        if (valor === "" || valor === null || valor === undefined) return null;
        if (tipo === "int") return parseInt(valor);
        if (tipo === "float") return parseFloat(valor);
        return valor;
    };

    return {
        codigo: parseOrNull(datos.codigo, "int"),
        codigop: parseOrNull(datos.codigop, "int"),
        descripcion: datos.descripcion || null,
        marca: datos.marca || null,
        publico: parseOrNull(datos.publico, "float"),
        proveedor: datos.proveedor || null,
        costo: parseOrNull(datos.costo, "float"),
        stock: parseOrNull(datos.stock, "int"),
        stockd: parseOrNull(datos.stockd, "int"),
        observacion: datos.observacion || null,
        cganancia: typeof datos.cganancia === "boolean" ? datos.cganancia : false,
        ganancia: parseOrNull(datos.ganancia, "float"),
    };
}


app.post("/articulo", async (req, res) => {

    try {
        let datos = normalizarDatosArticulo(req.body);

        
        const { codigo, codigop, descripcion, marca, publico, proveedor, costo, stock, stockd, observacion, cganancia, ganancia } = datos;


        const newArticulo = await pool.query(
            `INSERT INTO articulo (
                codigo, codigop, descripcion, marca,
                publico, proveedor, costo, stock,
                stockd, observacion, cganancia, ganancia
            ) VALUES (
                $1, $2, $3, $4,
                $5, $6, $7, $8,
                $9, $10, $11, $12
            ) RETURNING *`,
            [codigo, codigop, descripcion, marca, publico, proveedor, costo, stock, stockd, observacion, cganancia, ganancia]
        );


        if (!newArticulo?.rows?.length) {
            return res.status(500).json({ error: "Error al insertar el artículo." });
        }

        res.json(newArticulo.rows[0]);

        } catch (err) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
});


app.get("/articulo", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM articulo");
        res.json(resultado.rows);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener artículos" });
    }
});


app.delete("/articulo/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query("DELETE FROM articulo WHERE id = $1", [parseInt(id)]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensaje: "Artículo no encontrado" });
        }

        res.json({ mensaje: "Artículo eliminado" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar artículo" });
    }
});


app.put("/articulo/:id", async (req, res) => {
    const { id } = req.params;
    

    try {
        const idNumerico = parseInt(id);
        if (isNaN(idNumerico)) {
            return res.status(400).json({ error: "ID inválido" });
        }


        const datos = normalizarDatosArticulo(req.body);
        const {
            codigo, codigop, descripcion, marca, publico, proveedor,
            costo, stock, stockd, observacion, cganancia, ganancia
        } = datos;


        const resultado = await pool.query(
            "UPDATE articulo SET codigo=$1, codigop=$2, descripcion=$3, marca=$4, publico=$5, proveedor=$6, costo=$7, stock=$8, stockd=$9, observacion=$10, cganancia=$11, ganancia=$12 WHERE id=$13 RETURNING *",
            [codigo, codigop, descripcion, marca, publico, proveedor, costo, stock, stockd, observacion, cganancia, ganancia, idNumerico]
        );


        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensaje: "Artículo no encontrado" });
        }


        res.json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});