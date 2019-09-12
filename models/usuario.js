var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El usuario es obligatorio']},
    email: {type: String, unique: true, required: [true, 'El correo es obligatorio']},
    password: {type: String, required: [true, 'La password es obligatorio']},
    img: {type: String, required: false},
    role: {type: String, required: true, default: 'USER_ROLE'},
});

//  Exportar este archivo
module.exports = mongoose.model('Usuario', usuarioSchema);
