var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Hospital = require('../models/hospital');


/**  @Start Obtener todos los hospital */
<!-- ======================================================================== -->

// Rutasj
app.get('/', (req, res, next) => {

    //Me entregan dos parametros
    Hospital.find({}).exec(
        (error, hospitales) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando la base de datos hospital',
                    errors: error
                });
            }

            res.status(200).json({
                ok: true,
                hospitales: hospitales
            });
        });
});

<!-- ======================================================================== -->
<!-- End Obtener todos los hospital  -->



/**  @Start Actualizar un hospital */
<!-- ======================================================================== -->
app.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar  el hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital id: ' +id +' no existe',
                errors: {message: 'No existe un hospital con ese ID'}
            });
        }

        hospital.nombre = body.nombre;
        //hospital.usuario = req.usuario._id;
        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        });
    });
});

<!-- ======================================================================== -->
<!-- End Actualizar un hospital -->


/**  @Start Crear nuevo hospital */
<!-- ======================================================================== -->

app.post('/' ,mdAutenticacion.verificaToken , (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    //  Guardar usuario
    hospital.save((error, hospitalSave) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: error
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalSave
        });
    });
});

<!-- ======================================================================== -->
<!-- End Crear nuevo hospital -->


/**  @Start Borrar un hospital */
<!-- ======================================================================== -->

app.delete('/:hospital_a_borrar', (rep, res) => {
    var id = rep.params.hospital_a_borrar;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });
    });
});

<!-- ======================================================================== -->
<!-- End Borrar un usuario -->


//  Requerimos exportar esto porque lo usaremos en otro sitio
module.exports = app;
