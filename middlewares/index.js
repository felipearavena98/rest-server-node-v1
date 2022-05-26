const validarCampos = require('../middlewares/validar-campos');
const validateJWT = require('../middlewares/validate-jwt');
const validateRols = require('../middlewares/validate-rols');


module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRols
}