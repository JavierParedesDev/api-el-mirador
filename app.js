const express = require('express');
const app = express();
const db = require('./db.js');
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Endpoint para obtener la lista de gastos
app.get('/lista_gastos', (req, res) => {
    const query = 'SELECT * FROM mirador';

    db.query(query, (err, results) => {
        if (err) {
            console.log("Error en la consulta", err);
            res.status(500).send("Error en el servidor");
            return;
        }
        res.json(results);
    });
});

// Endpoint para agregar un nuevo gasto
app.post('/agregar_gastos', (req, res) => {
    const { id, mes, anio, monto, pagado, departamento } = req.body;

    // Validar que todos los campos estén presentes
    if ( !mes || !anio || !monto  === undefined || !departamento) {
        console.log("Faltan datos necesarios");
        res.status(400).send("Faltan datos necesarios");
        return;
    }

    console.log("Agregado");

    const query = 'INSERT INTO mirador (id, mes, anio, monto, pagado, departamento) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [id, mes, anio, monto, pagado, departamento], (err, results) => {
        if (err) {
            console.log("Error al agregar el gasto:", err);
            res.status(500).send("Error en el servidor");
            return;
        }
        console.log("Gasto agregado");
        res.status(201).send("Gasto agregado exitosamente");
    });
});

// Endpoint para actualizar un gasto (pago)
app.post('/pagar', (req, res) => {
    const { id, mes, anio, monto, pagado, departamento } = req.body;

    // Validar que todos los campos estén presentes
    if (!id || !mes || !anio || !monto || pagado === undefined || !departamento) {
        console.log("Faltan datos necesarios");
        res.status(400).send("Faltan datos necesarios");
        return;
    }

    console.log("Actualizando pago");

    const query = 'UPDATE mirador SET monto = ?, pagado = ?, departamento = ? WHERE id = ? AND mes = ? AND anio = ?';

    db.query(query, [monto, pagado, departamento, id, mes, anio], (err, results) => {
        if (err) {
            console.log("Error al actualizar el pago:", err);
            res.status(500).send({ message: "Error en el servidor" });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send({ message: "No se encontró el registro para actualizar" });
            return;
        }

        console.log("Pago actualizado");
        res.status(200).json({ message: "Pago actualizado exitosamente" });
    });
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}`);
});
