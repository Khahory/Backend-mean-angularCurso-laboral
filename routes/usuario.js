var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

var Usuario = require('../models/usuario');


<!-- Start Obtener todos los usuarios  -->
<!-- ======================================================================== -->

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

<!-- ======================================================================== -->
<!-- End Obtener todos los usuarios  -->


<!-- Start Actualizar un usuario -->
<!-- ======================================================================== -->

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar  el usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario id: ' +id +' no existe',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':^D';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});

<!-- ======================================================================== -->
<!-- End Actualizar un usuario -->


<!-- Start Crear nuevo usuario -->
<!-- ======================================================================== -->

app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password),
        img: body.img,
        role: body.role
    });

    //  Guardar usuario
    usuario.save((error, usuarioSave) => {
        if (error) {
            return res.status(400).json({
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

<!-- ======================================================================== -->
<!-- End Crear nuevo usuario -->

<!-- Start Borrar un usuario -->
<!-- ======================================================================== -->

app.delete('/:usuario_a_borrar', (rep, res) => {
    var id = rep.params.usuario_a_borrar;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            body: usuarioBorrado
        });
    });
});

<!-- ======================================================================== -->
<!-- End Borrar un usuario -->



//  Requerimos exportar esto porque lo usaremos en otro sitio
module.exports = app;
