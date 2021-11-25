const models = require('../models'); //este es el indez de carpeta 'models'

module.exports= {
    add: async(req, res, next) =>{
        try {
            //validacion de nombre categoria, que no exista
            const checkNombre = await models.categoria.findOne({nombre:req.body.nombre});
            if (!checkNombre ) {
                const registro = await models.categoria.create(req.body);
                res.status(200).json(registro);
            }else res.status(400).send("categoria ya existe") 
            
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
            });
            next(error);
        }
    },

  
    //metodo select
    list: async (req,res,next)=>{
        try {
            let valorBusqueda= req.query.valor; // se le puede poner .valor o cualquier otra cosa,
            const registros = await models.categoria.find({$or:[
                {nombre:new RegExp(valorBusqueda,'i') }  //esta expresion regular encuentra por nombre o rol, y busca coincidencias 'i'=includes
                
            ]}).sort({date: -1 });
            res.status(200).json(registros);

            
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
                
            });
            next(error);
        }

    },

    //metodo select solo categorias activas, para usar en la zona de articulos
    listActivos:async (req,res,next)=>{
        try {
            const registros = await models.categoria.find({activo:true}
            ).sort({date: -1 });
            res.status(200).json(registros);
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
                
            });
            next(error);
        }

    },

    //metodos activar o desactivar el usuario
    activate: async (req,res,next)=>{
        try {
            const registro = await models.categoria.findByIdAndUpdate({_id:req.body._id},{activo:true})
            res.status(200).json(registro)
            
            
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
                
            });
            next(error);
        }

    },

    desactivate: async (req,res,next)=>{
        try {
            const registro = await models.categoria.findByIdAndUpdate({_id:req.body._id},{activo:false})
            res.status(200).json(registro)
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
            });
            next(error);
        }
    },

    //metodo actualizar datos
    update: async (req,res,next)=>{
        try {
            const checkNombre = await models.categoria.findOne({nombre:req.body.nombre});
            if (!checkNombre ){
                const actualizar = await models.categoria.updateOne({_id:req.body._id},{
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,})
                res.status(200).json(actualizar)
            }else {
                const actualizar = await models.categoria.updateOne({_id:req.body._id},{
                descripcion: req.body.descripcion,})
                res.status(200).json(actualizar)
            } 
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
                
            });
            next(error);
        }
    },

    delete: async (req,res,next)=>{
        try {
            const checkNombre = await models.categoria.findOne({nombre:req.body.nombre});
            if (!checkNombre ){
                const actualizar = await models.categoria.updateOne({_id:req.body._id},{
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,})
                res.status(200).json(actualizar)
            }else {
                const actualizar = await models.categoria.updateOne({_id:req.body._id},{
                descripcion: req.body.descripcion,})
                res.status(200).json(actualizar)
            }
        } catch (error) {
            res.status(500).send({
                message: "ocurrio un error interno"
                
            });
            next(error);
        }
    },
}