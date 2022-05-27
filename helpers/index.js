const dbValidator = require('./db-validators');
const generarJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./subir-archivo');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile,
}