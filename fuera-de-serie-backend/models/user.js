const mongoose = require('mongoose');
const { Schema } = mongoose;

// var validateEmail = function(email) {
//     var re = /;
//     return re.test(email)
// };

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 100
    },
    correo: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 100,
        trim: true,
        unique: true
        // validate: [validateEmail, 'Please use a valid email address],
        // match: 
    },
    password: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 6
    },
    estado: {
        type: Number,
        default: 1,
    },
    rol: {
        type: String,
        required: true,
        enum: ['Desarrollador', 'Administrador', 'Usuario']
    },
    createedAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User
