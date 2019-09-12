// Requires
var express = require('express');
var mongoose = require('mongoose');


// Inicializar variables
var app = express();

// Importar rutas
var appRouter = require('./routes/app');
var usuarioRouter = require('./routes/usuario');


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutasj
app.use('/usuario', usuarioRouter);
app.use('/', appRouter);

// Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });

});

// Escuchar peticiones
app.listen(47017, () => {
    console.log('Express server puerto 47017: \x1b[32m%s\x1b[0m', 'online');
});


