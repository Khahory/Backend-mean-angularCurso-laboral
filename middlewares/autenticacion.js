var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

/**  @Start Verificar token */
<!-- ======================================================================== -->
exports.verificaToken = function (req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto ',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        next();

        // Decoded lo que hace es obtener lo que queremos que se envie o elimine (payload)
        // En el post podemos enviar una respuesta con req.usuario = decoded.usuario;
        // y mostrar en el metodo post: imprime(req.usuario); despues de que se ejecute el post

        // res.status(200).json({
        //     ok: true,
        //     decoded: decoded
        // });
    });
};


<!-- ======================================================================== -->
<!-- End Verificar token -->
