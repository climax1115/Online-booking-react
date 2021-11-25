const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    categoria:{
        type:Schema.ObjectId,  
        ref:'categoria', 
        required:[true, 'Categoria obligatorio']
    },
    codigo:{
        type: String, 
        required:[true,'Codigo obligatorio'], 
        maxlength: 50,
        unique:true 
    },
    plato:{
        type: String,
        required: [true,'Nombre obligatorio'], 
        maxlength: 50,
        minlength: 5,
    },
    descripcion:{
        type:String,
        required:true ,
        maxlength: 250,
        minlength:7,
    },
    precio:{
        type:Number, 
        required:true,
    },
    activo:{
        type: Boolean,
        default: true,
    },
    createedAt:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Dish', dishSchema)