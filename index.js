const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();





/// Crear el servidor de express
const app = express();

/// Base de Datos
dbConnection();

//CORS
app.use(cors());

// Directorio Publico
app.use( express.static('public'));

// Lectura y parseo del Body
app.use( express.json());

// Rutas
// Esta linea indica que todo lo que el archivo vaya a esportar
// lo debe habilitar en esa ruta
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/events', require('./routes/events')); 
// TODO: CRUD: Eventos





// Escuchar peticiones
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriedo en puerto ${process.env.PORT}`);
})