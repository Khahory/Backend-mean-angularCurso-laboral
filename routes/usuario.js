var express = require('express');
var app = express();

var Usuario = require('../models/usuario');

// Rutasj
app.get('/', (req, res, next) => {

    //Me entregan dos parametros
    Usuario.find({} ,'nombre email img role').exec(
        (error, usuarios) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando la base de datos',
                    errors: error
                });
            }

            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        });
});
//  Requerimos exportar esto porque lo usaremos en otro sitio
module.exports = app;
