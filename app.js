// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar variables
var app = express();

// Body-Parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar rutas
var appRouter = require('./routes/app');
var usuarioRouter = require('./routes/usuario');
var loginRouter = require('./routes/login');
var hospitalRouter = require('./routes/hospital');


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutasj
app.use('/usuario', usuarioRouter);
app.use('/login', loginRouter);
app.use('/hospital', hospitalRouter);
app.use('/', appRouter);

// Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: ' Peticion realizada correctamente'
    });

});

// Escuchar peticiones
app.listen(47017, () => {
    console.log('Express server puerto 47017: \x1b[32m%s\x1b[0m', 'online');
});
// 47017
// 27017


