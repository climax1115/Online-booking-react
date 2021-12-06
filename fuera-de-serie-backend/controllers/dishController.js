const models = require('../models'); //este es el index de carpeta 'models'

module.exports= {
    //Add Dish
    add: async(req, res, next) =>{
        try {
            //validacion de nombre Dish, que no exista
            const checkCodigo = await models.dish.findOne({codigo:req.body.codigo});
            if ( !checkCodigo ) {
                const registro = await models.dish.create(req.body);
                res.status(200).json(registro);
            }else res.status(400).send("Dish ya existe") 
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error interno."
            });
            next(error);
        }
    },

    //List Dish
    list: async (req,res,next)=>{
        try {
            let valorBusqueda= req.query.valor; // se le puede poner .valor o cualquier otra cosa,
            const registros = await models.dish.find({$or:[
                {plato:new RegExp(valorBusqueda,'i') }  //esta expresion regular encuentra por text o rol, y busca coincidencias 'i'=includes
            ]}).populate('categoria', { //metodo para traer info de la tabla categorias
                nombre:1, descripcion:1, activo:1
            }).sort({createedAt: -1 });
            res.status(200).json(registros);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error interno."
            });
            next(error);
        }
    },

    //Update Dish
    update: async (req,res,next)=>{
        try {
            const checkCodigo = await models.dish.findOne({_id:req.body._id});
            if ( !checkCodigo ){
                const actualizar = await models.dish.updateOne({_id:req.body._id},{
                    plato: req.body.plato,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    activo: req.body.activo,
                    codigo: req.body.codigo})
                res.status(200).json(actualizar)
            }else {
                const actualizar = await models.dish.updateOne({_id:req.body._id},{
                    plato: req.body.plato,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    activo: req.body.activo,
                    codigo: req.body.codigo})
                res.status(200).json(actualizar)
            }
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error interno."  
            });
            next(error);
        }
    },

    //Delete Dish
    remove: async (req,res,next)=>{
        try {
            const registro = await models.dish.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(registro)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error interno." 
            });
            next(error);
        }
    },
}