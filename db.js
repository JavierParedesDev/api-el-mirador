const mysql = require('mysql2');
require('dotenv').config(); 

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.log("Error al conectar", err);
        return;
    }
    console.log("Conectado a la base de datos");
});

module.exports = connection;
