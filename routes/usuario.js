var express = require('express');
var app = express();

var Usuario = require('../models/usuario');


<!-- ======================================================================== -->
<!-- Start Obtener todos los usuarios  -->

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

<!-- End Obtener todos los usuarios  -->
<!-- ======================================================================== -->

<!-- ======================================================================== -->
<!-- Start Crear nuevo usuario -->

app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    //  Guardar usuario
    usuario.save((error, usuarioSave) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: error
            });
        }

        res.status(201).json({
            ok: true,
            body: usuario
        });
    });
});

<!-- End Crear nuevo usuario -->
<!-- ======================================================================== -->

//  Requerimos exportar esto porque lo usaremos en otro sitio
module.exports = app;
