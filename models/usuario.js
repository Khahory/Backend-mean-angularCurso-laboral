var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

// Controlar los roles que se permiten
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

var usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El usuario es obligatorio']},
    email: {type: String, unique: true, required: [true, 'El correo es obligatorio']},
    password: {type: String, required: [true, 'La password es obligatorio']},
    img: {type: String, required: false},
    role: {type: String, required: true, default: 'USER_ROLE', enum: rolesValidos},
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} tiene que ser unico'});

//  Exportar este archivo
module.exports = mongoose.model('Usuario', usuarioSchema);
