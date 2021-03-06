var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;
var app = express();

var Usuario = require('../models/usuario');


<!-- Start Loquear usuario -->
<!-- ======================================================================== -->

app.post('/', (req, res) => {
    var body = req.body;

//verificar si exisye el correo

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }else if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        //  Comparar pass con las que esta en la DB
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas  - password',
                errors: err
            });
        }

        //  Crear token jwtk
        usuarioDB.password = ';^D';
        var token = jwt.sign({usuario: usuarioDB}, SEED, {expiresIn: 10000});

        res.status(200).json({
            ok: true,
            mensaje: 'Logueado',
            token: token,
            usuario: usuarioDB,
            id: usuarioDB._id,
            body: body
        });
    });
});

<!-- ======================================================================== -->
<!-- End Loquear usuario -->


//  Requerimos exportar esto porque lo usaremos en otro sitio
module.exports = app;

