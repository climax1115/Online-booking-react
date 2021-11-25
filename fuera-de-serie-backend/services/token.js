var jwt = require('jsonwebtoken');

module.exports = {
    encode : async(user) => {
        const token = jwt.sign({
            _id : user._id,
            name : user.nombre,
            email : user.correo,
            rol : user.rol
        }, 'UnaFreseSecretaParaCodificarMiUsuario' , {expiresIn : 86400 })
        return token;
    }
}