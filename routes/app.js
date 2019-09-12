var express = require('express');
var app = express();

// Rutasj
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});
    //  Requerimos exportar esto porque lo usaremos en otro sitio
module.exports = app;
